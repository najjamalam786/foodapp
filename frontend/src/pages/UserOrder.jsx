import React, { useEffect } from 'react'
import EmptyCart from "../img/emptyCart.svg"
import Logo from "../img/food_logo.png"
import { Link } from 'react-router-dom';
import OrderItems from '../components/OrderItems';
import { useDispatch, useSelector } from 'react-redux';
import { addAllOrders } from '../redux/createSlice/orderSlice';


export default function UserOrder() {

  const { currentUser } = useSelector(state => state.user);

  const { orderItems } = useSelector((state) => state.order);

  const dispatchEvent = useDispatch();

  useEffect(() => {
    const fetchOrderData = async (e) => {
      
      await fetch('/api/user/orderdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentUser?.email }),
      }).then((res) => {
        res.json().then((response) => {

          dispatchEvent(addAllOrders(response));


        })
      })
    }

    fetchOrderData();
    
  }, [])


  return (

    <main
      className="p-3 mx-auto mt-[10rem] max-w-6xl h-full drop-shadow-md flex flex-col "
    >
      <div className="flex  items-center justify-between border-b-4 border-orange-500 pr-4 ">
        <Link to={"/"}>
          <img src={Logo} alt="logo" className="w-[140px] object-cover pb-4 " />

        </Link>
        <p className=" text-slate-800 text-2xl font-semibold ">Your Orders</p>

      </div>



      {/* Order Section */}

      {/* <div className="flex flex-col mt-[50px] lg:flex-row gap-4">
        <div name="order" className=""> */}


      <div className="w-full max-h-[700px] md:h-42 px-6 py-6 flex flex-col gap-3 overflow-y-scroll no-scrollbar">
        {/* Order Item */}
        {orderItems && orderItems.length > 0 ?
          // <p className="text-slate-800 text-2xl font-semibold">working</p>

          orderItems.slice(0).reverse().map((item) => (
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
