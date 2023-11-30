import React from 'react'
import * as Images from "../../utilities/images";
import Image from "next/image";
import ProductSearch from '../../components/commanComonets/Product/productSearch';


const FullCart = () => {
    return (
        <>
            <div className='fullCartSection'>
                <div className='row'>
                    <div className='col-lg-7 col-md-7'>
                        <div className='commanOuter me-0 commonSubOuter fullCartLeft'>
                            <div className='fullCartInfo'>
                                <div className='appointmentHeading'>
                                    <Image src={Images.boldLeftArrow} alt="leftarrow image" className="img-fluid" />
                                    <h4 className='appointMain ms-2'>Full Cart</h4>
                                </div>
                                <div className='ProductSearch w-50'>
                                    <ProductSearch />
                                </div>
                            </div>
                            <hr className='cartDivide'/>
                        </div>
                    </div>
                    <div className='col-lg-5 col-md-5'>
                        <div className='commanOuter me-0 ms-2 commonSubOuter fullCartRight'></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FullCart