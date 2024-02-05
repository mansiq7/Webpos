import React, { useEffect, useState } from "react";
import * as Images from "../../utilities/images";
import Image from "next/image";
import Pagination from "../../components/commanComonets/pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  searchBySKU,
  searchInvoiceByInvoiceId,
  selectReturnData,
  setInvoiceData,
} from "../../redux/slices/productReturn";
import { selectLoginAuth } from "../../redux/slices/auth";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CustomModal from "../../components/customModal/CustomModal";
import Manualinvoice from "./manual-entry(search)";

const ProductInvoice = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const authData = useSelector(selectLoginAuth);
  const posData = authData?.posUserLoginDetails?.payload;
  const merchentDetails = authData?.usersInfo?.payload?.user?.user_profiles;
  const sellerId = authData?.usersInfo?.payload?.uniqe_id;
  const [searchInvoiceViaBarcode, setSearchInvoiceViaBarcode] = useState("");
  const invoiceData = useSelector(selectReturnData);
  const SearchInvoiceRespones = invoiceData?.invoiceByInvoiceId;
  const returnData = SearchInvoiceRespones?.return;
  const returnProductArray = returnData?.return_details;
  const orderDetails = SearchInvoiceRespones?.order;
  const [checkeddata, setCheckedData] = useState("");
  const [productDetails, setProductDetails] = useState([]);
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

  useEffect(() => {
    if (SearchInvoiceRespones?.order?.order_details) {
      setProductDetails(
        SearchInvoiceRespones?.order?.order_details?.map((item) => ({
          ...item,
          isChecked: false,
        }))
      );
    }
  }, [SearchInvoiceRespones?.order?.order_details, checkeddata]);

  const handleSearchInvoice = (e) => {
    let params = {
      invoiceId: e?.target?.value ? e.target.value : e,
      seller_id: sellerId,
    };

    dispatch(
      searchInvoiceByInvoiceId({
        ...params,
        cb(resp) {
          if (resp) {
          }
        },
      })
    );
  };

  const handleGoToNext = () => {
    const selectedProductItems = productDetails?.filter(
      (item) => item?.isChecked
    );
    if (selectedProductItems?.length > 0) {
      router.push({
        pathname: "/Product/productrefunds(Price-format)",
      });

      const shareData = {
        selectedItems: JSON.stringify(selectedProductItems),
      };
      dispatch(setInvoiceData(shareData));
    } else {
      toast.error("Please select products to refund!");
    }
  };

  const handleCheckboxChange = (data) => {
    const updatedProductDetails = productDetails?.map((item) =>
      data?.product_id === item?.product_id
        ? { ...item, isChecked: item?.isChecked ? false : true }
        : item
    );
    setProductDetails(updatedProductDetails);
  };

  const handleGoToManualEntry = () => {
    setModalDetail({ show: true, flag: "manualEntry" });
    setKey(Math.random());
  };

  useEffect(() => {
    if (searchInvoiceViaBarcode) {
      let params = {
        app_name: "pos",
        seller_id: sellerId,
        search: searchInvoiceViaBarcode,
      };
      dispatch(
        searchBySKU({
          ...params,
          cb(res) {
            if (res?.status) {
              setCheckedData(res?.data?.payload?.product_detail);
            }
          },
        })
      );
    }
  }, [searchInvoiceViaBarcode]);

  const handleSacnBarcode = (e) => {
    const enteredValue = e.target.value;
    if (enteredValue.length <= 15) {
      setSearchInvoiceViaBarcode(enteredValue);
    }
  };

  useEffect(() => {
    if (checkeddata) {
      const updatedProductDetails = productDetails?.map((item) =>
        checkeddata?.id === item?.product_id
          ? { ...item, isChecked: true }
          : item
      );
      setProductDetails(updatedProductDetails);
    }
  }, [checkeddata]);

  useEffect(() => {
    handleSearchInvoice(SearchInvoiceRespones?.id);
  }, []);

  const { sumQtyPrice } = returnProductArray
    ? returnProductArray.reduce(
        (acc, item) => {
          const qty = Number(item?.order_details?.qty) || 0;
          const price = Number(item?.order_details?.price) || 0;

          acc.sumQtyPrice += qty * price;

          return acc;
        },
        { sumQtyPrice: 0 }
      )
    : { sumQtyPrice: 0 };

  const sumTax = returnProductArray?.reduce((acc, item) => {
    const price = Number(item?.order_details?.price) || 0;
    const tax = 0.08 * price; // 8% tax
    return acc + tax;
  }, 0);

  const totalAmount = sumQtyPrice - sumTax;

  return (
    <>
      <div className="productInvoice">
        <div className="row">
          <div className="col-lg-6">
            <div className="commanOuter">
              <div class="searchBar">
                <input
                  type="text"
                  class="form-control searchControl"
                  placeholder="Search here the # of invoice"
                  onChange={(e) => handleSearchInvoice(e)}
                />
                <figure className="scanBox">
                  <Image
                    src={Images.scanImg}
                    alt="ScanIcon"
                    className="img-fluid "
                  />
                </figure>
                <Image
                  src={Images.SearchIcon}
                  alt="SearchImageIcon"
                  className="img-fluid searchImg"
                />
              </div>
              <div className="invoiceHeader">
                <p className="innerHeading">
                  Invoices
                  <span className="productCount">
                    (#{SearchInvoiceRespones?.invoice_number})
                  </span>
                </p>
              </div>
              <div className="commanscrollBar InvoiceTableBox">
                <div className="table-responsive">
                  <table id="invoiceProduct" className="product_table">
                    <thead className="invoiceHeadingBox">
                      <tr>
                        <th className="invoiceHeading"># Invoice</th>
                        <th className="invoiceHeading">Customer</th>
                        <th className="invoiceHeading">Sale</th>
                        <th className="invoiceHeading">Items</th>
                        <th className="invoiceHeading">Price</th>
                        <th className="invoiceHeading"></th>
                      </tr>
                    </thead>

                    {SearchInvoiceRespones ? (
                      <tbody>
                        <tr className="product_invoice active">
                          <td className="invoice_subhead">
                            #{SearchInvoiceRespones?.invoice_number}
                          </td>
                          <td className="invoice_subhead">
                            <figure className="">
                              <Image
                                src={Images.jokerImg}
                                alt="tableImg"
                                className="costumerImg"
                              />
                              <span>
                                {SearchInvoiceRespones?.order?.user_details
                                  ?.user_profiles?.firstname
                                  ? SearchInvoiceRespones?.order?.user_details
                                      ?.user_profiles?.firstname
                                  : "NA"}
                              </span>
                            </figure>
                          </td>
                          <td className="invoice_subhead">
                            <figure className="inStoreBtn">
                              <Image
                                src={Images.storeImg}
                                alt="store"
                                className="storeimg"
                              />
                              <span>
                                {SearchInvoiceRespones?.order
                                  ?.delivery_option === "1"
                                  ? "Delivery"
                                  : SearchInvoiceRespones?.order
                                      ?.delivery_option === "2"
                                  ? "Reservation"
                                  : SearchInvoiceRespones?.order
                                      ?.delivery_option === "3"
                                  ? "Instore"
                                  : SearchInvoiceRespones?.order
                                      ?.delivery_option === "4"
                                  ? "Shipping"
                                  : "Instore"}
                              </span>
                            </figure>
                          </td>
                          <td className="invoice_subhead">
                            {SearchInvoiceRespones?.order?.total_items}
                          </td>

                          <td className="invoice_subhead">
                            <figure className="priceBtn">
                              <Image
                                src={Images.moneyImg}
                                alt="money"
                                className="moneyImg"
                              />
                              <span>
                                ${SearchInvoiceRespones?.order?.actual_amount}
                              </span>
                            </figure>
                          </td>

                          <td className="invoice_subhead">
                            <Image
                              src={Images.arrowIcon}
                              alt="arrows"
                              className="arrowRight_"
                            />
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td colSpan={6}>
                            <p className="noInvoiceText my-3">
                              No Invoices Found
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
              <Pagination />
            </div>
          </div>

          {returnData ? (
            <>
              {" "}
              <div className="col-lg-6 col-md-6">
                <div className="commanOuter me-0 ms-0 commonSubOuter confirmRight p-0">
                  <div className="confirmRightSub confirmAddress">
                    <h2 className="mapleHeading text-center">
                      {merchentDetails?.organization_name}.
                    </h2>
                    <h4 className="mapleAddress text-center">
                      {" "}
                      {merchentDetails?.current_address?.street_address},
                      {merchentDetails?.current_address?.city},
                      {merchentDetails?.current_address?.state},
                      {merchentDetails?.current_address?.country},
                      {merchentDetails?.current_address?.zipcode}
                    </h4>
                    <h4 className="mapleAddress text-center p-0">
                      {" "}
                      {merchentDetails?.full_phone_number}
                    </h4>
                  </div>
                  <div className="mapleProductDetails confirmRightSub">
                    {returnProductArray?.map((data, idx) => {
                      return (
                        <div
                          key={idx}
                          className="flexBox mapleProductDetailsBox"
                        >
                          <div className="flexbase">
                            <p className="mapleProductcount">
                              × {data?.order_details?.qty}
                            </p>
                            <article className="ms-3">
                              <p className="mapleProductHeading">
                                {data?.order_details?.product_name}
                              </p>
                              {/* <span className="mapleProductcount">Yellow / M</span> */}
                            </article>
                          </div>
                          <article>
                            <p className="mapleProductPrice">
                              $
                              {/* {Number(data?.refunded_amount)
                                ? Number(data?.refunded_amount).toFixed(2)
                                : Number(data?.order_details?.price) *
                                  Number(data?.order_details?.qty)} */}
                              {Number(data?.refunded_amount) *
                                Number(data?.returned_qty)}
                            </p>
                          </article>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flexBox mapleInvoiceBox confirmRightSub">
                    <article>
                      <p className="mapleProductPrice">Status</p>
                      <p className="mapleProductHeading">{returnData?.type}</p>
                      <p className="mapleProductPrice">Invoice</p>
                      <p className="mapleProductHeading">
                        # {returnData?.invoices?.invoice_number}
                      </p>
                    </article>
                    <article>
                      <p className="mapleProductPrice">Date</p>
                      <p className="mapleProductHeading">
                        {" "}
                        {moment
                          .utc(returnData?.updated_at)
                          .format("ddd, DD/MM/YYYY")}
                      </p>
                      <p className="mapleProductPrice">POS No.</p>
                      <p className="mapleProductHeading">
                        #{posData?.pos_number}
                      </p>
                    </article>
                    <article>
                      <p className="mapleProductPrice">Mode</p>
                      <p className="mapleProductHeading">Walk-In</p>
                      <p className="mapleProductPrice">User UD</p>
                      <p className="mapleProductHeading">{posData?.id}</p>
                    </article>
                  </div>
                  <div className="flexBox maplePriceBox">
                    <article>
                      <p className="productName">Subtotal</p>
                      <p className="productName">Tax</p>

                      <p className="productName fw-bold">Total</p>
                    </article>
                    <article>
                      <p className="productName">
                        -$
                        {Number(returnData?.refunded_amount)
                          ? Number(returnData?.refunded_amount)
                          : Number(sumQtyPrice)}
                      </p>
                      <p className="productName">
                        -$
                        {Number(returnData?.tax)
                          ? Number(returnData?.tax)
                          : Number(sumTax).toFixed(2)}
                      </p>

                      <p className="totalBtn">
                        -$
                        {Number(returnData?.refunded_amount) -
                        Number(returnData?.tax)
                          ? Number(returnData?.refunded_amount) -
                            Number(returnData?.tax)
                          : totalAmount.toFixed(2)}
                      </p>
                    </article>
                  </div>
                  <div className="confirmFooter">
                    <Image
                      src={Images.Logo}
                      alt="logo"
                      className="img-fluid logo"
                    />
                    <Image
                      src={Images.barCodeScanImg}
                      alt="barCodeScanImg"
                      className="img-fluid barCodeScanImg"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : SearchInvoiceRespones ? (
            <div className="col-lg-6">
              <div className="commanOuter">
                <div className="d-flex justify-content-between mb-3">
                  <figure className="">
                    <Image
                      src={Images.jokerImg}
                      alt="tableImg"
                      className="costumerImg"
                    />
                    <span className="innerHeading ps-2">Customer</span>
                  </figure>
                  <figure className="">
                    <Image
                      src={Images.storeImg}
                      alt="store"
                      className="storeimg"
                    />
                    <span className="innerHeading px-2">
                      {" "}
                      {SearchInvoiceRespones?.order?.delivery_option == "1"
                        ? "Delivery"
                        : SearchInvoiceRespones?.order?.delivery_option === "2"
                        ? "Reservation"
                        : SearchInvoiceRespones?.order?.delivery_option === "3"
                        ? "In-store"
                        : SearchInvoiceRespones?.order?.delivery_option === "4"
                        ? "Shipping"
                        : "In-store"}
                    </span>
                    <button className="inStoreBtn">
                      {" "}
                      {moment(orderDetails?.date).format("DD/MM/YYYY")}
                    </button>
                  </figure>
                </div>
                <div className="d-flex justify-content-between  invoiceSearchBox pb-3">
                  <div className="SearchinvoiceBox">
                    <div className="ProductsearchBar">
                      <input
                        type="text"
                        className="form-control searchControl"
                        placeholder="Scan Barcode of each Item"
                        value={searchInvoiceViaBarcode}
                        onChange={(e) => handleSacnBarcode(e)}
                      />
                      <Image
                        src={Images.scanImg}
                        alt="SearchImageIcon"
                        className="img-fluid scanImg"
                      />
                    </div>
                  </div>
                  <div className="invoiceButtonBox">
                    <button
                      type="button"
                      className="boderdManualButton"
                      onClick={(e) => handleGoToManualEntry(e)}
                    >
                      Manual Entry
                      <Image
                        src={Images.plusRound}
                        alt="SearchImageIcon"
                        className="img-fluid ms-2"
                      />
                    </button>
                  </div>
                </div>
                <div className="detailScrollDelivery  mt-3">
                  {productDetails?.length > 0 ? (
                    productDetails?.map((data, idx) => (
                      <div className="selectedProductDetails" key={idx}>
                        <div className="d-flex productDataInfo">
                          <figure>
                            <Image
                              src={data?.product_image}
                              alt="tableImg"
                              className="costumerImg"
                              height={100}
                              width={100}
                            />
                          </figure>
                          <div className="ps-1">
                            <p className="aboutProduct invoiceDataText">
                              {data?.product_name}
                            </p>
                            <div className="d-flex">
                              {/* <article className="productColor">
                              <span className="Yellow"></span>
                              <span className="Red"></span>
                              <span className="Pink"></span>
                              <span className="Blue"></span>
                              <span className="Black"></span>
                              <span className="White"></span>
                            </article> */}
                              {/* <span className="productSize">Colors / Size</span> */}
                            </div>
                          </div>
                        </div>
                        <p className="productPriceinvoice">${data?.price}</p>
                        <p className="productPriceinvoice">{data?.qty}</p>
                        <p className="productPriceinvoice">
                          ${data?.price * data?.qty}
                        </p>
                        <article>
                          <label className="custom-checkbox">
                            <input
                              type="checkbox"
                              checked={data?.isChecked}
                              onChange={() => handleCheckboxChange(data)}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </article>
                      </div>
                    ))
                  ) : (
                    <>
                      {productDetails?.length === 0 ? (
                        <h3 className="mt-3 mb-3">No Data Found!</h3>
                      ) : (
                        <div className="loaderOuter">
                          <div className="spinner-grow loaderSpinner text-center my-5"></div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="OrderBox">
                      <div className="OrderCheckoutBox">
                        <p className="orderHeading">Total Items</p>
                        <p className="orderSubHeading">
                          {orderDetails?.total_items}
                        </p>
                      </div>
                      <div className="OrderCheckoutBox">
                        <p className="orderHeading">Order Date</p>
                        <p className="orderSubHeading">
                          {moment(orderDetails?.date).format("DD/MM/YYYY")}
                        </p>
                      </div>
                      <div className="OrderCheckoutBox">
                        <p className="orderHeading">Order ID#</p>
                        <p className="orderSubHeading">{orderDetails?.id}</p>
                      </div>
                      <div className="OrderCheckoutBox">
                        <p className="orderHeading">Payment Method</p>
                        <figure className="priceBtn">
                          <Image
                            src={Images.moneyImg}
                            alt="money"
                            className="moneyImg me-2"
                          />
                          <span>{orderDetails?.mode_of_payment}</span>
                        </figure>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="productBilling">
                      <div className="OrderDiscountBox">
                        <div className="flexBox ">
                          <p className="orderHeading">Sub Total</p>
                          <p className="orderSubHeading">
                            ${orderDetails?.actual_amount}
                          </p>
                        </div>
                        <div className="flexBox">
                          <p className="orderHeading">Discount</p>
                          <p className="orderSubHeading">
                            -$
                            {orderDetails?.discount
                              ? orderDetails?.discount
                              : "0.00"}
                          </p>
                        </div>
                        <div className="flexBox">
                          <p className="orderHeading">Other Fees</p>
                          <p className="orderSubHeading">
                            ${orderDetails?.tips ? orderDetails?.tips : "0.00"}
                          </p>
                        </div>
                        <div className="flexBox">
                          <p className="orderHeading">Tax</p>
                          <p className="orderSubHeading">
                            ${orderDetails?.tax ? orderDetails?.tax : "0.00"}
                          </p>
                        </div>
                      </div>
                      <div className="OrderTotal">
                        <div className="flexBox">
                          <p className="priceHeading">Total</p>
                          <p className="priceHeading">
                            ${orderDetails?.payable_amount}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="BlueBtn w-100"
                          onClick={(e) => {
                            handleGoToNext(e);
                          }}
                        >
                          Next
                          <Image
                            src={Images.ArrowRight}
                            alt="ArrowRight"
                            className="img-fluid ArrowRight"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-lg-6">
              <div className="commanOuter d-flex align-items-center justify-content-center">
                <div className="w-100 text-center">
                  <Image src={Images.Receiptbill} />
                  <h2 className="noInvoiceText">No Invoices selected</h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={false}
        mediumWidth={false}
        ids={
          modalDetail.flag === "manualEntry" ? "manualEntry" : "ReturnInventory"
        }
        child={
          modalDetail.flag === "manualEntry" ? (
            <Manualinvoice
              closeManulModal={() => handleOnCloseModal()}
              productDetails={productDetails}
              setCheckedData={setCheckedData}
            />
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default ProductInvoice;
