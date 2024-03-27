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
                body: JSON.stringify({ message: `Thank you for ordering from our ${currentUser.email} website. Your order will be delivered soon. `}),
            }).then(() => {
                console.log("working twilio")
            })
        }

        twilioSendSMS()
    }, [])
  return (
    <div
    
    className="w-full h-full rounded-t-[2rem] bg-green-300 drop-shadow-md flex flex-col"
    >
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={ConfirmTiffin} className="w-300" alt="confirm_img" />
          <p className="text-xl text-textColor font-semibold">
            Thank you for ordering from our website.
            <br />
            Your Food will be delivered soon.
          </p>
        <button onClick={confirmOrderHandler} className='bg-orange-500 w-[200px] text-white  px-4 py-2 rounded-lg'>Go Back Home</button>
        <Link to="/user-orders">
        <button onClick={confirmOrderHandler} className='bg-green-500 w-[200px] text-white px-4 py-2 rounded-lg'>See Order</button>
        </Link>
        </div>
    </div>
  )
}
