import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import OrderPlace from "../img/food-delivery.png"
import Delivery from '../img/delivery.png';

import { useDispatch, useSelector } from 'react-redux'
import { confirmOrderPlaced } from '../redux/createSlice/orderSlice';

export default function ConfirmOrder() {
    const {currentUser} = useSelector(state => state.user)
    const {monthlySub} = useSelector(state => state.order)
    const dispatch = useDispatch();

    const confirmOrderHandler = () => {
        dispatch(confirmOrderPlaced(false));  
      };

    useEffect(() => {
        const twilioSendSMS = async() => {
            await fetch("/api/user/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  mobile: import.meta.env.VITE_TWILIO_NUMBER, 

                  message: `from FOOD-HOUSE... Thank you for ordering from our ${currentUser.email} ans ${currentUser.mobile} website. Your order will be delivered soon. `
                }),
            })
        }

        twilioSendSMS()
    }, [])
  return (
    <div
    
    className="w-full h-full rounded-t-[2rem] bg-gradient-to-br from-blue-800 to-blue-500 drop-shadow-md "
    >
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={OrderPlace} className="w-[10rem] lg:w-225" alt="confirm_img" />
          <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-4xl sm:text-6xl text-white font-extrabold">
            Order Place
            
          </p>
          
          <div className="flex gap-4 items-center bg-gradient-to-r from-[#ffffff00] to-[#00e6eece] p-2 pl-4 rounded-r-full">
          <p className="text-sm sm:text-xl  text-slate-800 font-bold">Your Food will be delivered soon...
          </p>
          <div className='w-10 h-10 bg-white rounded-full overflow-hidden'>
                    <img src={Delivery} className='w-full h-full object-contain' alt="bike img" />
                </div>
          </div>
          </div>
        <button onClick={confirmOrderHandler} className='bg-blue-500 w-[200px] text-white font-semibold  px-4 py-2 rounded-lg'>Go Back Home</button>

        
        { monthlySub ? (
        <Link to="/user-member">
        <button onClick={confirmOrderHandler} className='bg-blue-500 w-[200px] text-white px-4 py-2 rounded-lg'>See Membership</button>
        </Link>

        ) : (

        <Link to="/user-orders">
        <button onClick={confirmOrderHandler} className='bg-blue-800 w-[200px] text-white px-4 py-2 rounded-lg'>See Order</button>
        </Link>
        )
      

        }

          <p className="w-full text-center  bottom-[10%] left-[10%] text-white  text-[15px] sm:text-xl bg-gradient-to-r from-orange-600 to-orange-300 p-2 font-semibold ">
            Thank you for ordering from our website.
            
          </p>

        </div>
    </div>
  )
}
