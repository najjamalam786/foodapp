import React, { useEffect, useState } from 'react'
import EmptyCart from "../img/emptyCart.svg";
import OrderItems from '../components/OrderItems';
import { useSelector } from 'react-redux';


export default function UserOrder() {

  const {currentUser} = useSelector(state => state.user);

  const [orderItems, setOrderItems] = useState([]);


  useEffect(() => {
    const fetchOrderData = async(e) => {
      await fetch('/api/user/orderdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentUser?.email }),
      }).then((res) => {
        res.json().then((allOrder) => {
          // console.log("allOrder",allOrder);
          setOrderItems(allOrder);
        })
      })
    }

    fetchOrderData();
  }, [])


  return (

    <main
      className="p-3 mx-auto max-w-6xl h-full drop-shadow-md flex flex-col "
    >
      <p
        className="text-slate-800 text-2xl font-semibold p-1 px-2 "
      
      >
        Your Order
      </p>


      {/* Order Section */}

      {/* <div className="flex flex-col mt-[50px] lg:flex-row gap-4">
        <div name="order" className=""> */}
          
           
            <div className="w-full max-h-[700px] md:h-42 px-6 py-6 flex flex-col gap-3 overflow-y-scroll no-scrollbar">
              {/* Order Item */}
              { orderItems ? orderItems.slice(0).reverse().map((item) => (
                <OrderItems
                  key={item._id}
                  orderitem={item}
                />
              ))
              : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                  <img src={EmptyCart} className="w-300" alt="" />
                  <p className="text-xl text-textColor font-semibold">
                    Add some items to your order
                  </p>
                </div>
                )}
              
              
            </div>
            
            
          {/* </div>
        </div> */}

    </main>

  );
}
