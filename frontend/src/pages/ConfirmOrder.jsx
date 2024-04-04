import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import ConfirmTiffin from "../img/confirm_favicon.png"
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

                  message: `from TIFFINBOX... Thank you for ordering from our ${currentUser.email} website. Your order will be delivered soon. `
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
          <img src={ConfirmTiffin} className="w-[10rem] lg:w-225" alt="confirm_img" />
          <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-4xl sm:text-6xl text-white font-extrabold">
            Order Place
            
          </p>
          <p className="text-sm sm:text-xl bg-gradient-to-r from-[#1aff00f1] to-[#0078da94] p-2 pl-4 text-cartNumBg rounded-lg font-bold">Your Food will be delivered soon...</p>
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
