import React from 'react'
import { TiSocialFacebook, TiSocialInstagram, TiSocialLinkedin, TiSocialYoutube } from 'react-icons/ti';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" border-t-2 text-gray-800 border-gray-300 bg-gradient-to-r from-[#ececec] to-[rgb(236,236,235)] bg-shadow p-2 ">

      

      <div className="  flex flex-wrap justify-center gap-8 py-20 pt-36">

        <div className=" relative text-center  p-6">
        <div className="absolute right-0 left-0 top-[-2rem] mx-auto flex items-center justify-center ">
        <p className="text-cartNumBg text-4xl font-bold">FOOD-HOUSE</p>
      </div>

          <h5 className='uppercase border-b-2 font-semibold text-orange-500  border-orange-500 mb-4'>Location</h5>
          <p>Phulwari Sharif, Patna District</p>
          <p>Md Najjam,Pin- 801505</p>
          <p>Bihar, India</p>
        </div>

        <div className="text-center   p-6">
          <h5 className='uppercase border-b-2 font-semibold text-orange-500  border-orange-500 mb-4'>Working Hours</h5>
          <p>Breakfast: 8:00AM - 10:00AM</p>
          <p>Lunch: 1:00PM - 3:30PM</p>
          <p>Dinner: 7:00PM - 10:00PM</p>
          <h5 className='font-bold'>
           Current Date: {new Date().toUTCString().slice(0, 16)}
          </h5>
        </div>


        <div className="text-center p-6">
          <h5 className='uppercase border-b-2 font-semibold text-orange-500  border-orange-500 mb-4'>Contact Us</h5>



          <p>Easy to Ask, Contact Us Now</p>
          <p>
            <Link to="tel:7667650665" className="text-cartNumBg font-semibold text-3xl">
              766-765-0665
            </Link>
          </p>
        </div>

        <div className="text-center p-6">
          <h5 className='uppercase border-b-2 font-semibold text-orange-500  border-orange-500 mb-4'>Follow Us</h5>
          <p>Our Social Media Plateforms</p>
          <ul className="flex gap-4 justify-center items-center  mt-2">
                  <li>
                    <Link to="/">
                      <TiSocialLinkedin size={30} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <TiSocialFacebook size={30} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <TiSocialYoutube size={30} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <TiSocialInstagram size={30} />
                    </Link>
                  </li>
                </ul>
        </div>


      </div>

      <div>
        <ul className="flex gap-4 justify-center items-center text-center mb-0">
          <li>
            <Link to="/">
              © 2023 <span className='font-semibold border-b-2 text-cartNumBg'>Najjam</span>. All Rights Reserved
            </Link>
          </li>
          <li>
            <Link to="/">About Us</Link>
          </li>
          <li>
            <Link to="/">Terms Of Use</Link>
          </li>
          <li>
            <Link to="/">Privacy Policy</Link>
          </li>
        </ul>
      </div>

      {/* Sroll To Top */}
      {/* {isVisible && (
        <div className="scroll_top" onClick={scrollTop}>
          <i class="bi bi-arrow-up"></i>
        </div>
      )} */}
    </footer>
  )
}
