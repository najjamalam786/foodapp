import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import ConfirmTiffin from "../img/confirm_favicon.png"
import { useDispatch, useSelector } from 'react-redux'
import { confirmOrderPlaced } from '../redux/createSlice/orderSlice';

export default function ConfirmOrder() {
    const {currentUser} = useSelector(state => state.user)
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
            }).then(() => {
                console.log("working twilio")
            })
        }

        twilioSendSMS()
    }, [])
  return (
    <div
    
    className="w-full h-full rounded-t-[2rem] bg-gradient-to-tr from-[#0d2650] to-[#3760a7] drop-shadow-md flex flex-col"
    >
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={ConfirmTiffin} className="w-300" alt="confirm_img" />
          <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-xl text-white font-semibold">
            Thank you for ordering from our website.
            
          </p>
          <p className="text-xl text-white font-semibold">Your Food will be delivered soon...</p>
          </div>
        <button onClick={confirmOrderHandler} className='bg-orange-500 w-[200px] text-white  px-4 py-2 rounded-lg'>Go Back Home</button>
        <Link to="/user-orders">
        <button onClick={confirmOrderHandler} className='bg-green-500 w-[200px] text-white px-4 py-2 rounded-lg'>See Order</button>
        </Link>
        </div>
    </div>
  )
}
