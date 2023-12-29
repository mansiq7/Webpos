import React from 'react'
import DeliveryRightSidebar from '../../components/commanComonets/Delivery/deliveryRightSidebar'
import * as Images from "../../utilities/images"
import Image from "next/image";

const OrderReview = () => {
    return (
        <>
            <div className='shippingSection deliverOrderSection'>
                <div className='deliverMain w-100'>
                    <div className='row '>
                        <div className='col-lg-6'>
                            <div className='deliverOrderLeft deliveryOuter me-0'>
                                <div className='flexTable'>
                                    <Image src={Images.boldLeftArrow} alt="boldLeftArrow " className="img-fluid me-2" />
                                    <h4 className='loginMain text-start m-0'>Shipping Orders to Review</h4>
                                </div>
                                <div className='table-responsive mt-3'>
                                    <table id="" className="orderDeliverTable">
                                        <tbody>
                                            <tr className='product_invoice active'>
                                                <td className="invoice_subhead">
                                                    <div className="nameLocation">
                                                        <h4 className="assignId">Samara Schwansteiger</h4>
                                                        <div className="deliverTableBx">
                                                            <Image
                                                                src={Images.OrderLocation}
                                                                alt="location Image"
                                                                className="img-fluid ms-1"
                                                            />
                                                            <span className="locateDistance">Kiev, Ukraine</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="invoice_subhead">
                                                    <div className="itemMoney">
                                                        <h4 className="assignId">3 items</h4>
                                                        <div className="deliverTableBx">
                                                            <Image
                                                                src={Images.MoneyItem}
                                                                alt="MoneyItemImage "
                                                                className="img-fluid ms-1"
                                                            />
                                                            <span className="locateDistance">$500.50
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="invoice_subhead">
                                                    <div className='expresSaver'>
                                                        <Image src={Images.shipFed} alt="pickupImg image" className="img-fluid shipPickImg m-0" />
                                                        <div className='subSaver'>
                                                            <h4 className='assignId'>FedEx Express Saver</h4>
                                                            <div className='immediateBox mt-1'>
                                                                <Image src={Images.Fast} alt="deliverFast image" className="img-fluid m-0" />
                                                                <h4 className='immediateText'>3 Days Shipping</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='invoice_subhead verticalBase'>
                                                    <div className='deliverArrow text-end'>
                                                        <Image src={Images.RightArrow} alt="RightArrow image" className="img-fluid ms-1" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className=' deliveryOuter deliverOrderRight ms-0'>
                                <div className='orderLeftInfo'>
                                    <div className='flexTable'>
                                        <figure className='orderAroundImg'>
                                            <Image src={Images.LoginThird} alt="LoginThird image " className="orderPerson" />
                                        </figure>
                                        <h4 className='cancelOrderText ms-1'>Samara Stellinberg</h4>
                                    </div>
                                    <div className='expresSaver'>
                                        <Image src={Images.shipFed} alt="pickupImg image" className="img-fluid shipPickImg m-0" />
                                        <div className='subSaver'>
                                            <h4 className='assignId'>FedEx Express Saver</h4>
                                            <div className='immediateBox mt-1'>
                                                <Image src={Images.Fast} alt="deliverFast image" className="img-fluid m-0" />
                                                <h4 className='immediateText'>3 Days Shipping</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className='divideBorder my-3' />
                                <div className='detailScroll  mt-3'>
                                    <div className='selectedProductDetails'>
                                        <div className='d-flex'>
                                            <Image src={Images.cartFood} alt="cartFoodImg" className="img-fluid cartFoodImg" />
                                            <div className='ps-1'>
                                                <p className='aboutProduct'>Name Product Gender and Quality</p>
                                                <div className='d-flex'>
                                                    <article className='productColor'>
                                                        <span className='Yellow'></span>
                                                        <span className='Red'></span>
                                                        <span className='Pink'></span>
                                                        <span className='Blue'></span>
                                                        <span className='Black'></span>
                                                        <span className='White'></span>
                                                    </article>
                                                    <span className='productSize ms-2'>Colors / Size</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className='productPriceinvoice'>$90.00</p>
                                        <p className='productPriceinvoice'>1</p>
                                        <p className='productPriceinvoice'>$90.00</p>
                                        <article>
                                            <label className="custom-checkbox">
                                                <input type="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </article>
                                    </div>
                                    <div className='selectedProductDetails'>
                                        <div className='d-flex'>
                                            <Image src={Images.cartFood} alt="cartFoodImg" className="img-fluid cartFoodImg" />
                                            <div className='ps-1'>
                                                <p className='aboutProduct'>Name Product Gender and Quality</p>
                                                <div className='d-flex'>
                                                    <article className='productColor'>
                                                        <span className='Yellow'></span>
                                                        <span className='Red'></span>
                                                        <span className='Pink'></span>
                                                        <span className='Blue'></span>
                                                        <span className='Black'></span>
                                                        <span className='White'></span>
                                                    </article>
                                                    <span className='productSize ms-2'>Colors / Size</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className='productPriceinvoice'>$90.00</p>
                                        <p className='productPriceinvoice'>1</p>
                                        <p className='productPriceinvoice'>$90.00</p>
                                        <article>
                                            <label className="custom-checkbox">
                                                <input type="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </article>
                                    </div>
                                    <div className='selectedProductDetails'>
                                        <div className='d-flex'>
                                            <Image src={Images.cartFood} alt="cartFoodImg" className="img-fluid cartFoodImg" />
                                            <div className='ps-1'>
                                                <p className='aboutProduct'>Name Product Gender and Quality</p>
                                                <div className='d-flex'>
                                                    <article className='productColor'>
                                                        <span className='Yellow'></span>
                                                        <span className='Red'></span>
                                                        <span className='Pink'></span>
                                                        <span className='Blue'></span>
                                                        <span className='Black'></span>
                                                        <span className='White'></span>
                                                    </article>
                                                    <span className='productSize ms-2'>Colors / Size</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className='productPriceinvoice'>$90.00</p>
                                        <p className='productPriceinvoice'>1</p>
                                        <p className='productPriceinvoice'>$90.00</p>
                                        <article>
                                            <label className="custom-checkbox">
                                                <input type="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </article>
                                    </div>
                                    <div className='selectedProductDetails'>
                                        <div className='d-flex'>
                                            <Image src={Images.cartFood} alt="cartFoodImg" className="img-fluid cartFoodImg" />
                                            <div className='ps-1'>
                                                <p className='aboutProduct'>Name Product Gender and Quality</p>
                                                <div className='d-flex'>
                                                    <article className='productColor'>
                                                        <span className='Yellow'></span>
                                                        <span className='Red'></span>
                                                        <span className='Pink'></span>
                                                        <span className='Blue'></span>
                                                        <span className='Black'></span>
                                                        <span className='White'></span>
                                                    </article>
                                                    <span className='productSize ms-2'>Colors / Size</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className='productPriceinvoice'>$90.00</p>
                                        <p className='productPriceinvoice'>1</p>
                                        <p className='productPriceinvoice'>$90.00</p>
                                        <article>
                                            <label className="custom-checkbox">
                                                <input type="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </article>
                                    </div>
                                    <div className='selectedProductDetails'>
                                        <div className='d-flex'>
                                            <Image src={Images.cartFood} alt="cartFoodImg" className="img-fluid cartFoodImg" />
                                            <div className='ps-1'>
                                                <p className='aboutProduct'>Name Product Gender and Quality</p>
                                                <div className='d-flex'>
                                                    <article className='productColor'>
                                                        <span className='Yellow'></span>
                                                        <span className='Red'></span>
                                                        <span className='Pink'></span>
                                                        <span className='Blue'></span>
                                                        <span className='Black'></span>
                                                        <span className='White'></span>
                                                    </article>
                                                    <span className='productSize ms-2'>Colors / Size</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className='productPriceinvoice'>$90.00</p>
                                        <p className='productPriceinvoice'>1</p>
                                        <p className='productPriceinvoice'>$90.00</p>
                                        <article>
                                            <label className="custom-checkbox">
                                                <input type="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </article>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-4'>
                                        <div className='OrderBox p-0'>
                                            <div className="OrderCheckoutBox">
                                                <p className='orderHeading'>Total Items</p>
                                                <p className='orderSubHeading'>7</p>
                                            </div>
                                            <div className="OrderCheckoutBox">
                                                <p className='orderHeading'>Order Date</p>
                                                <p className='orderSubHeading'>10/10/2023</p>
                                            </div>
                                            <div className="OrderCheckoutBox">
                                                <p className='orderHeading'>Order ID#</p>
                                                <p className='orderSubHeading'>JOBR00001</p>
                                            </div>
                                            <div className="OrderCheckoutBox">
                                                <p className='orderHeading'>Payment Method</p>
                                                <figure className='priceBtn'>
                                                    <Image src={Images.moneyImg} alt="money" className="moneyImg" />
                                                    <span className='ms-1'>Cash</span>
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-8'>
                                        <div className="productBilling">
                                            <div className='OrderDiscountBox'>
                                                <div className='flexBox '>
                                                    <p className='orderHeading'>Sub Total</p>
                                                    <p className='orderSubHeading'>$2,396.50</p>
                                                </div>
                                                <div className='flexBox'>
                                                    <p className='orderHeading'>Discount</p>
                                                    <p className='orderSubHeading'>-$19.00</p>
                                                </div>
                                                <div className='flexBox'>
                                                    <p className='orderHeading'>Other Fees</p>
                                                    <p className='orderSubHeading'>$14,000</p>
                                                </div>
                                                <div className='flexBox'>
                                                    <p className='orderHeading'>Fax</p>
                                                    <p className='orderSubHeading'>$236</p>
                                                </div>
                                            </div>
                                            <div className='OrderTotal'>
                                                <div className='flexBox'>
                                                    <p className='priceHeading'>Total</p>
                                                    <p className='priceHeading'>$254.60</p>
                                                </div>
                                                <div className='flexBox '>
                                                    <button className='declineButton w-100' type='button'> Decline</button>
                                                    <button type='button' className='BlueBtn w-100'>
                                                        Accept
                                                        <Image src={Images.ArrowRight} alt="ArrowRight" className="img-fluid ArrowRight" />
                                                    </button>
                                                </div>
                                                <button type='button ' className='pickupBtn w-100 mt-2 d-none'>
                                                    Ready to Pick Up
                                                    <Image src={Images.deliverHand} alt="deliverHand image" className="img-fluid" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DeliveryRightSidebar />
            </div>
        </>
    )
}

export default OrderReview