import React, { useState } from "react";
import * as Images from "../../../utilities/images";
import Image from "next/image";
import CustomModal from "../../customModal/CustomModal";
import CashSummary from "./cashSummary";
import { amountFormat } from '../../../utilities/globalMethods';
import EndCashOutConfirmationModal from "./endCashOutConfirmationModal";

const EndCashOutModal = ({ expectedAmount, title }) => {
  // const dispatch = useDispatch();
  // const sessionData = useSelector(selectCashDrawerData);
  // const drawerSessionDetail = sessionData?.drawerSession?.payload;
  // const expectedCash = sessionData?.expectedCashByDrawerId;

  const [key, setKey] = useState(Math.random());
  const [enteredAmount, setEnteredAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(0);

  const [modalDetail, setModalDetail] = useState({
    show: false,
    // title: "End Cash Tracking Session",
    // type: "add",
    // flag: "trackingmodal",
  });

  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      // title: "",
      // flag: "",
    });
    setKey(Math.random());
  };

  return (
    <>
      <div className="trackingSection">
        <div className="trackingSub">
          <figure className="profileImage ">
            <Image
              src={Images.salesTracking}
              alt="trackingImage"
              className="img-fluid"
              height={50}
              width={50}
            />
          </figure>
          <h6 className="loginheading px-5 mt-3 mb-5">{title}</h6>
          {/* <h4 className="trackingHeading">Enter amount </h4> */}
        </div>
        <div className="buttonBox">
          <div
            onClick={() => setSelectedAmount(0)}
            className={`endCashOutButton ${selectedAmount == 0 ? 'selected' : ""}`}
          >
            <p className="removeTextStyle"><b>$0</b></p>
          </div>
          <div
            onClick={() => setSelectedAmount(expectedAmount)}
            className={`endCashOutButton ${selectedAmount == expectedAmount ? 'selected' : ""}`}
          >
            <p className="removeTextStyle"><b>{amountFormat(expectedAmount)}</b></p>
          </div>
        </div>
        <form className="mt-5">
          <h3 className="amountText">Other Amount</h3>
          <div className="inputSelect mt-2">
            <input
              type="number"
              className="form-control trackingInput"
              // name={generateRandomName}
              // autoComplete="new-password"
              placeholder="$0.00"
              value={enteredAmount}
              onChange={(e) => {e.target.value <= expectedAmount ? setEnteredAmount(e.target.value) : false;}}
            />
          </div>

          <div className="verifyBtn mt-4 mb-3">
            <button
              className="nextverifyBtn w-100"
              type="button"
              onClick={() => {
                console.log("here");
                setModalDetail({
                  show: true,
                  // title: "End Cash Tracking Session",
                  // type: "remove",
                  // flag: "trackingmodal",
                });
                setKey(Math.random());
              }}
            >
              Next
              <Image
                src={Images.ArrowRight}
                alt="rightArrow"
                className="img-fluid rightImg"
              />
            </button>
          </div>
        </form>
      </div>

      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        ids={"trackingModal"}
        child={
          <EndCashOutConfirmationModal
            title={modalDetail.title}
            enteredAmount={enteredAmount}
            selectedAmount={selectedAmount}
            expectedAmount={expectedAmount}
            close={() => handleOnCloseModal()}
          />
        }
        header={
          <p onClick={handleOnCloseModal} className="modal_cancel">
            <Image
              src={Images.modalCross}
              alt="modalCross"
              className="img-fluid"
            />
          </p>
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default EndCashOutModal;
