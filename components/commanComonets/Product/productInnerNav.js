import React, { useState } from 'react'
import ProductSearch from './productSearch';
import * as Images from "../../../utilities/images"
import Image from "next/image";
import { useRouter } from 'next/router';


const ProductInnerNav = () => {
    const router = useRouter();
    const [filterShow, setFilterShow] = useState(false)

    return (
        <>
            <div className='productNavbar'>
                <div className='productAll'>
                    <p className='ProductAbout'>All Products <span className='productCount'>(+1280)</span></p>
                </div>
                <div className='ProductSearch w-50'>
                    <ProductSearch />
                </div>
                <button className={router.pathname == '/Product' ? 'BlueBtn' : 'GreyBtn'} onClick={() => router.push("/Product")} >Products
                    <Image src={Images.Shopping_Outline} alt="image" className="img-fluid BtnIcon" />
                </button>
                <button className={router.pathname == '/service' ? 'BlueBtn' : 'GreyBtn'} onClick={() => router.push("/service")}>Services
                    <Image src={Images.Services} alt="image" className="img-fluid BtnIcon" />
                </button>
                <div className='filterDropSelect'>
                    <button className='GreyBtn' onClick={() => setFilterShow(prev => !prev)}>Filters
                        <Image src={Images.FilterIcon} alt="image" className="img-fluid BtnIcon" />
                    </button>
                    {
                        filterShow ?
                            <div className='FilterMultiSelect'>
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="Category">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#CategoryBox" aria-expanded="true" aria-controls="CategoryBox">
                                                Category
                                            </button>
                                        </h2>
                                        <div id="CategoryBox" className="accordion-collapse collapse show" aria-labelledby="Category" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Health</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Music</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Food</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Pets</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Nutrition</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Cars</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Building</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Laws</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Love</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="Availability">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#AvailabilityBox" aria-expanded="false" aria-controls="AvailabilityBox">
                                                Availability
                                            </button>
                                        </h2>
                                        <div id="AvailabilityBox" className="accordion-collapse collapse show" aria-labelledby="Availability" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Today</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Tomorrow</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>This Week</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>This Month</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Anytime</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="Duration">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#DurationBox" aria-expanded="false" aria-controls="DurationBox">
                                                Duration
                                            </button>
                                        </h2>
                                        <div id="DurationBox" className="accordion-collapse collapse" aria-labelledby="Duration" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Today</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Tomorrow</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>This Week</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>This Month</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Anytime</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="Location">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#LocationBox" aria-expanded="false" aria-controls="LocationBox">
                                                Location
                                            </button>
                                        </h2>
                                        <div id="LocationBox" className="accordion-collapse collapse" aria-labelledby="Location" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Today</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Tomorrow</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>This Week</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>This Month</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Anytime</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="Pricing">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#PricingBox" aria-expanded="false" aria-controls="PricingBox">
                                                Pricing
                                            </button>
                                        </h2>
                                        <div id="PricingBox" className="accordion-collapse collapse" aria-labelledby="Pricing" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Today</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Tomorrow</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>This Week</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>This Month</span>
                                                </label>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    <span className='filteredheading'>Anytime</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <></>
                    }
                </div>
            </div>
        </>
    )
}
function toggleDropdown(dropdown) {
    dropdown.classList.toggle('open');
}
export default ProductInnerNav