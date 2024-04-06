import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import AboutImg from "../img/about_img.jpg"
import { pageLoader } from '../redux/createSlice/orderSlice';

export default function AboutUs() {

  const dispatchEvent = useDispatch();

  useEffect(() => {
    dispatchEvent(pageLoader(true));

    setTimeout(() => {
      dispatchEvent(pageLoader(false));
    }, 500);
  },[])
  return (
    <div className='p-4 px-10 my-[10rem]'>
      <h1 className='text-slate-600 font-bold text-[2.5rem] text-center mb-8 border-b-2'>About Us</h1>
      <div className=" flex gap-8 ">
        <div className='flex flex-col gap-4 '>
        <h1 className='text-slate-600 font-bold text-[2rem]'>Who we Are ?</h1>
        <p className="text-slate-600 text-sm">
        Launched in 2024, Our technology platform connects customers, restaurant partners and delivery partners, serving their multiple needs. Customers use our platform to search and discover restaurants, read and write customer generated reviews and view and upload photos, order food delivery, book a table and make payments while dining-out at restaurants. On the other hand, we provide restaurant partners with industry-specific marketing tools which enable them to engage and acquire customers to grow their business while also providing a reliable and efficient last mile delivery service. We also operate a one-stop procurement solution, Hyperpure, which supplies high quality ingredients and kitchen products to restaurant partners. We also provide our delivery partners with transparent and flexible earning opportunities.
        </p>
        </div>
        <img src={AboutImg} alt="about" className="w-[50%] rounded-lg" />
    </div>
    </div>
  )
}
