import React, { useEffect } from 'react'
import NotFound from "../img/NotFound.svg";

import { useDispatch, useSelector } from 'react-redux';
import MemberOrder from '../components/MemberOrder';
import { monthlySubscriptionItem } from '../redux/createSlice/itemSlice';
export default function UserMember() {

    const { monthlySubItems } = useSelector(state => state.item);
    const {currentUser} = useSelector(state => state.user);
    const dispatch = useDispatch();
      useEffect(() => {
        const fetchOrderData = async(e) => {
          await fetch('/api/user/orderdata', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: currentUser?.email }),
          }).then((res) => {
            res.json().then((response) => {
              // console.log("allOrder",allOrder);
             
                dispatch(monthlySubscriptionItem(response));
                
              
            })
          })
        }
        fetchOrderData();
      }, [])
     


  return (
   
    <main
      className="max-w-6xl h-full drop-shadow-md flex flex-col mx-auto"
    >
      <div className=" px-4 mt-[10rem]   ">
      
      <div className="flex items-center justify-between border-b-4  border-orange-500">
      <p
        className="text-orange-500 text-2xl font-semibold p-1 px-2 capitalize"
      
      >
        Welcome <span className="bg-gradient-to-tr from-indigo-800 to-indigo-400 bg-clip-text text-transparent">{currentUser?.username}!</span>
      </p>
      <p
        className="text-orange-500 text-2xl font-semibold p-1 px-2 "
      
      >
        Food <span className="bg-gradient-to-tr from-indigo-800 to-indigo-400 bg-clip-text text-transparent ">Membership</span> 
      </p>
      </div>


      {/* Order Section */}

      {/* <div className="flex flex-col mt-[50px] lg:flex-row gap-4">
        <div name="order" className=""> */}
          
           
            <div className="w-full max-h-[700px] md:h-42 px-6 py-6 flex flex-col gap-3 overflow-y-scroll no-scrollbar">
              {/* Order Item */}
              { monthlySubItems && monthlySubItems.length > 0 ? 
              // <p className="text-slate-800 text-2xl font-semibold">working</p>
            
              monthlySubItems.slice(0).reverse().map((item) => (
                <MemberOrder
                  key={item._id}
                  memberorder={item}
                />
              ))
              : (
                <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Membership Not Found
          </p>
        </div>
                )}
              
              
            </div>
            
      </div>
            
          {/* </div>
        </div> */}

    </main>
  )
}
