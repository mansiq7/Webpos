import React, { useEffect, useState } from "react";
import * as Images from "../../utilities/images";
import Image from "next/image";
import { ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getHoldProductCart,
  holdCart,
  productCart,
  selectRetailData,
} from "../../redux/slices/retails";
import {
  amountFormat,
  formattedReturnPrice,
  getProductPrice,
} from "../../utilities/globalMethods";
import CustomProductAdd from "./CustomProductAdd";
import { useRouter } from "next/router";
import CartAlert from "./CartAlert";
import CustomServiceAdd from "./CustomServiceAdd";
import moment from "moment";
import CustomModal from "../../components/customModal/CustomModal";
// import CustomModal from '../../customModal/CustomModal';
// import AddProduct from '../../../components/';

const RightSideBar = ({ props }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { parameter } = router.query;
  const retailData = useSelector(selectRetailData);
  const cartData = retailData?.productCart || {};
  const cartAmount = cartData?.amount;
  const cartLength = cartData?.poscart_products?.length;
  const [filterShow, setFilterShow] = useState(false);
  const [customProductAdd, setCustomProductAdd] = useState(false);
  const [customServiceAdd, setCustomServiceAdd] = useState(false);
  const holdCartArray = retailData?.holdProductData || [];
  const [holdLoader, setHoldLoader] = useState(false);
  const holdProductArray = holdCartArray?.filter(
    (item) => item.is_on_hold === true
  );
  const [cartAlert, setCartAlert] = useState(false);

  const productCarts = cartData?.poscart_products?.filter(
    (item) => item?.product_type == "product"
  );

  const serviceCart = cartData?.poscart_products?.filter(
    (item) => item?.product_type == "service"
  );

  useEffect(() => {
    if (Object.keys(cartData)?.length == 0) {
      setFilterShow(false);
    }
  }, [cartData]);

  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };

  // hold Cart function
  const serviceCartStatusHandler = () => {
    setHoldLoader(true);
    const params =
      holdProductArray?.length > 0
        ? {
            status: !holdProductArray?.[0]?.is_on_hold,
            cartId: holdProductArray?.[0]?.id,
          }
        : {
            status: !retailData?.productCart?.is_on_hold,
            cartId: retailData?.productCart?.id,
          };
    dispatch(
      holdCart({
        ...params,
        cb: () => {
          dispatch(getHoldProductCart());
          dispatch(productCart());
          setHoldLoader(false);
        },
      })
    );
  };

  return (
    <>
      {parameter == "product" ? (
        <div
          className={
            props?.showSidebar ? "sidebarRight show" : "sidebarRight hide"
          }
        >
          <ListGroup>
            <ListGroupItem
              className="rightSidebarItems active"
              onClick={() => {
                productCarts?.length > 0
                  ? setFilterShow((prev) => !prev)
                  : void 0;
              }}
            >
              <div className="sidebarBg">
                <Image
                  src={Images.ShoppingOutline}
                  alt="image"
                  className="imgSize"
                />
              </div>
              <span className="cartNum">{productCarts?.length || "0"}</span>
            </ListGroupItem>
            {/* <ListGroupItem className="rightSidebarItems" onClick={() => {
                      setModalDetail({ show: true, flag: "AddProduct" });
                      setKey(Math.random());
                  }}>
                      <div className='sidebarBg'>
                          <Image src={Images.AddProduct} alt="image" className="img-fluid rightSidebarIcons" />
                      </div>
                  </ListGroupItem> */}

            <ListGroupItem className="rightSidebarItems">
              <div
                className="sidebarBg"
                onClick={() => {
                  serviceCart?.length > 0
                    ? (setModalDetail({
                        show: true,
                        flag: "CartAlert",
                      }),
                      setKey(Math.random()))
                    : setModalDetail({
                        show: true,
                        flag: "AddProduct",
                      });
                  setKey(Math.random());
                  // setCustomProductAdd(true);
                }}
              >
                <Image
                  src={Images.AddProduct}
                  alt="image"
                  className="img-fluid rightSidebarIcons"
                />
              </div>
            </ListGroupItem>
            <ListGroupItem
              className="rightSidebarItems"
              onClick={() =>
                dispatch(
                  clearCart({
                    cb: () => {
                      dispatch(productCart());
                    },
                  })
                )
              }
            >
              <div className="sidebarBg">
                <Image
                  src={Images.Cancelproduct}
                  alt="image"
                  className="img-fluid rightSidebarIcons"
                />
              </div>
            </ListGroupItem>
            {holdLoader ? (
              <div
                className="rightSidebarItems mt-4"
                style={{ borderWidth: "1px" }}
              >
                <span className="spinner-border spinner-border-sm mx-1"></span>
              </div>
            ) : (
              <ListGroupItem
                className={
                  holdProductArray?.length > 0
                    ? "rightSidebarItems active "
                    : "rightSidebarItems"
                }
                onClick={() => serviceCartStatusHandler()}
              >
                <>
                  <div className="sidebarBg">
                    <Image
                      src={Images.PauseCircleOutline}
                      alt="image"
                      className="img-fluid rightSidebarIcons"
                    />
                  </div>
                  {holdProductArray?.length > 0 && (
                    <span className="holdNum">
                      {holdProductArray?.length || "0"}
                    </span>
                  )}
                </>
              </ListGroupItem>
            )}
            <ListGroupItem
              className="rightSidebarItems"
              onClick={() =>
                productCarts?.length > 0
                  ? router.push({ pathname: "/Retails/ProductCart" })
                  : void 0
              }
            >
              <Image
                src={Images.RightArrow}
                alt="image"
                className="img-fluid rightSidebarIcons"
              />
            </ListGroupItem>
          </ListGroup>
        </div>
      ) : (
        <div
          className={
            props?.showSidebar ? "sidebarRight show" : "sidebarRight hide"
          }
        >
          <ListGroup>
            <ListGroupItem
              className="rightSidebarItems active"
              onClick={() => {
                serviceCart?.length > 0
                  ? setFilterShow((prev) => !prev)
                  : void 0;
              }}
            >
              <div className="sidebarBg">
                <Image
                  src={Images.ShoppingOutline}
                  alt="image"
                  className="imgSize"
                />
              </div>
              <span className="cartNum">{serviceCart?.length || "0"}</span>
            </ListGroupItem>
            {/* <ListGroupItem className="rightSidebarItems" onClick={() => {
                    setModalDetail({ show: true, flag: "AddProduct" });
                    setKey(Math.random());
                }}>
                    <div className='sidebarBg'>
                        <Image src={Images.AddProduct} alt="image" className="img-fluid rightSidebarIcons" />
                    </div>
                </ListGroupItem> */}

            <ListGroupItem className="rightSidebarItems">
              <div
                className="sidebarBg"
                onClick={() => {
                  productCarts?.length > 0
                    ? (setModalDetail({
                        show: true,
                        flag: "CartAlert",
                      }),
                      setKey(Math.random()))
                    : //  setCustomServiceAdd(true);
                      setModalDetail({
                        show: true,
                        flag: "ServiceProductAdd",
                      });
                  setKey(Math.random());
                }}
              >
                <Image
                  src={Images.AddProduct}
                  alt="image"
                  className="img-fluid rightSidebarIcons"
                />
              </div>
            </ListGroupItem>
            <ListGroupItem
              className="rightSidebarItems"
              onClick={() =>
                dispatch(
                  clearCart({
                    cb: () => {
                      dispatch(productCart());
                    },
                  })
                )
              }
            >
              <div className="sidebarBg">
                <Image
                  src={Images.Cancelproduct}
                  alt="image"
                  className="img-fluid rightSidebarIcons"
                />
              </div>
            </ListGroupItem>

            {holdLoader ? (
              <div
                className="rightSidebarItems mt-4"
                style={{ borderWidth: "1px" }}
              >
                <span className="spinner-border spinner-border-sm mx-1"></span>
              </div>
            ) : (
              <ListGroupItem
                className={
                  holdProductArray?.length > 0
                    ? "rightSidebarItems active "
                    : "rightSidebarItems"
                }
                onClick={() => serviceCartStatusHandler()}
              >
                <>
                  <div className="sidebarBg">
                    <Image
                      src={Images.PauseCircleOutline}
                      alt="image"
                      className="img-fluid rightSidebarIcons"
                    />
                  </div>
                  {holdProductArray?.length > 0 && (
                    <span className="holdNum">
                      {holdProductArray?.length || "0"}
                    </span>
                  )}
                </>
              </ListGroupItem>
            )}

            <ListGroupItem
              className="rightSidebarItems"
              onClick={() =>
                serviceCart?.length > 0
                  ? router.push({ pathname: "/Retails/ServiceCart" })
                  : void 0
              }
            >
              <Image
                src={Images.RightArrow}
                alt="image"
                className="img-fluid rightSidebarIcons"
              />
            </ListGroupItem>
          </ListGroup>
        </div>
      )}

      {filterShow ? (
        <div className="AddtoCart ProductAddCart">
          <div className="cartInfo">
            {cartData?.poscart_products?.map((data, index) => {
              const productSize =
                data?.product_details?.supply?.attributes?.filter(
                  (item) => item?.name?.toLowerCase() == "size"
                );
              const productColor =
                data?.product_details?.supply?.attributes?.filter(
                  (item) => item?.name?.toLowerCase() == "color"
                );

              return (
                <div className="cartSubInfo active productCartShow" key={index}>
                  <div className="orderTime productCartInfo">
                    <Image
                      src={data?.product_details?.image}
                      alt="cartFoodImg"
                      className="img-fluid cartFoodImg"
                      width="100"
                      height="100"
                    />
                    <div className="cartorderHeading ms-2 ">
                      <h4 className="cartText cartShowText">
                        {data?.product_details?.name}
                      </h4>
                      {data?.product_type === "service" && (
                        <div className="userIdText mt-1">
                          {moment.utc(data?.date).format("LL")} @
                          {data?.start_time + "-" + data?.end_time}
                        </div>
                      )}

                      <div className="flexTable mt-1">
                        {productColor?.length > 0 && (
                          <>
                            <span className="userIdText">Colors :</span>
                            <div
                              style={{
                                width: "12px",
                                height: "12px",
                                border: "1px solid black",
                                borderRadius: "15%",
                                // display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: productColor?.[0]?.values?.name,
                              }}
                            ></div>
                          </>
                        )}

                        {productSize?.length > 0 && (
                          <span className="userIdText mx-2">
                            Size : {productSize?.[0]?.values?.name}{" "}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="orderCalculate">
                    <h4 className="cartMoney">
                      {amountFormat(
                        getProductPrice(
                          data.product_details?.supply?.supply_offers,
                          data.product_details?.supply?.supply_prices
                            ?.selling_price,
                          data.qty
                        )
                      )}
                    </h4>
                    <div className="incrementBtn ">
                      <i className="fa-solid fa-minus plusMinus"></i>
                      <input
                        className="form-control addBtnControl"
                        type="number"
                        placeholder="1"
                      />
                      <i className="fa-solid fa-plus plusMinus"></i>
                    </div>
                    <label className="custom-checkbox">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              );
            })}

            <div className="subFooter">
              <div className="dividesection">
                <hr className="divideBorder" />
              </div>
              <div className="cartTotalsection">
                <div className="cartTotal">
                  <h4 className="userPosition">Sub Total</h4>
                  <h4 className="amountText m-0">
                    {amountFormat(cartAmount?.products_price)}
                  </h4>
                </div>
                <div className="cartTotal">
                  <h4 className="userPosition">{`Discount ${
                    cartData?.discount_flag === "percentage" ? "(%)" : ""
                  } `}</h4>
                  <h4 className="amountText m-0">
                    {formattedReturnPrice(cartAmount?.discount || "0.00")}
                  </h4>
                </div>
                <div className="cartTotal">
                  <h4 className="userPosition">Total Taxes</h4>
                  <h4 className="amountText m-0">
                    {amountFormat(cartAmount?.tax)}
                  </h4>
                </div>
                <div className="cartTotal">
                  <h4 className="userPosition">Total</h4>
                  <h4 className="amountText m-0">
                    {amountFormat(cartAmount?.total_amount)}
                  </h4>
                </div>
                <button
                  className="nextverifyBtn w-100"
                  onClick={() => {
                    parameter == "product"
                      ? router.push({ pathname: "/Retails/ProductCart" })
                      : router.push({ pathname: "/Retails/ServiceCart" });
                  }}
                >
                  Proceed to checkout
                  <Image
                    src={Images.ArrowRight}
                    alt="rightArrow"
                    className="img-fluid rightImg"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* cart alert popup */}
      {/* <Modal show={cartAlert} centered keyboard={false}>
        <CartAlert crossHandler={() => setCartAlert(false)} />
      </Modal> */}

      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={false}
        mediumWidth={false}
        ids={
          modalDetail.flag === "AddProduct"
            ? "AddProduct"
            : "ServiceProductAdd"
            ? "ServiceProductAdd"
            : "CartAlert"
            ? "CartAlert"
            : ""
        }
        child={
          modalDetail.flag === "AddProduct" ? (
            <CustomProductAdd crosshandler={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "ServiceProductAdd" ? (
            <CustomServiceAdd crosshandler={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "CartAlert" ? (
            <CartAlert crossHandler={() => handleOnCloseModal()} />
          ) : (
            " "
          )
        }
        header={
          <>
            {modalDetail.flag === "AddProduct" ? (
              <>
                <h2 className="modalHeading mb-0">
                  <figure className="text-center">
                    <Image
                      src={Images.plusRound}
                      alt="img"
                      onClick={() => handleOnCloseModal()}
                    />
                  </figure>
                  <p className="addProductHeading">
                    Add New Product
                    <br></br> Manually
                  </p>
                </h2>
                <button className="closeButton d-none">
                  <Image
                    src={Images.crossIcon}
                    alt="img"
                    onClick={() => handleOnCloseModal()}
                  />
                </button>
              </>
            ) : modalDetail.flag === "ServiceProductAdd" ? (
              <>
                <h2 className="modalHeading mb-0">
                  <figure className="text-center">
                    <Image
                      src={Images.plusRound}
                      alt="img"
                      onClick={() => handleOnCloseModal()}
                    />
                  </figure>
                  <p className="addProductHeading">
                    Add New Service
                    <br></br> Manually
                  </p>
                </h2>
                <button className="closeButton d-none">
                  <Image
                    src={Images.crossIcon}
                    alt="img"
                    onClick={() => handleOnCloseModal()}
                  />
                </button>
              </>
            ) : modalDetail.flag === "CartAlert" ? (
              <h5 className="font-28 text-center">
                Please clear {productCarts?.length > 0 ? "product" : "service"}{" "}
                cart
              </h5>
            ) : (
              ""
            )}
          </>
        }
        onCloseModal={() => handleOnCloseModal()}
        // footer={
        //   <>
        //     <div className="modal-footer">
        //       <button
        //         className="cancelBtn"
        //         onClick={() => handleOnCloseModal()}
        //       >
        //         Cancel
        //       </button>
        //       <button className="ModalBlue">
        //         Add to the cart
        //         <Image
        //           src={Images.plusRound}
        //           alt="image"
        //           className="img-fluid BtnIcon"
        //         />
        //       </button>
        //     </div>
        //   </>
        // }
      />
    </>
  );
};

export default RightSideBar;
