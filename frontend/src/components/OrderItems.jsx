import React from 'react'
import FoodData from './FoodData';


export default function OrderItems({ orderitem }) {

  return (

    <>
    {
      orderitem.monthlySub === undefined && <main className="flex flex-col lg:flex-row gap-2">
      <div className="w-full flex flex-col gap-4 flex-1 rounded-lg border ">

        <div className="w-full flex px-6 py-2 overflow-hidden bg-orange-500 rounded-t-lg justify-between">
          <p className=" text-white  ">{orderitem.orderDate} </p>

          <p className='text-white'>{orderitem.orderTime}</p>

        </div>
        
        <div className=" px-6 pb-4">
          <div className="w-full px-6 py-4 border rounded-lg flex flex-col ">


            {/* Food Item */}
            {orderitem && orderitem.foodData.slice(0).reverse().map((item) => (
              <FoodData
                key={item._id}
                food={item}

              />
            ))}

          </div>
        </div>

      </div>

      {/* Total price section */}
      <div name="totalPrice" className="flex flex-col gap-4 w-full lg:w-[400px] lg:h-full">
        <div className="w-full py-6 px-6 rounded-lg border flex flex-col gap-4">

          <p className="text-base font-semibold text-orange-500"><u>Food Delivery Address</u></p>

          <div className="flex flex-col overflow-hidden">

            <p className="text-base text-gray-400">Landmark: <span className='text-slate-600'>{orderitem.shippingAddress.landmark}</span></p>
            <p className="text-base text-gray-400">Address: <span className='text-slate-600'>{orderitem.shippingAddress.address}</span></p>
            <p className="text-base  text-gray-400">District: <span className='text-slate-600'>{orderitem.shippingAddress.district}</span></p>
            <p className="text-base text-gray-400">pincode: <span className='text-slate-600'>{orderitem.shippingAddress.pincode}</span></p>
            <p className="text-base text-gray-400">Phone number: <span className='text-slate-600'>{orderitem.shippingAddress.newMobile}</span></p>



          </div>




          <div className="flex flex-col items-end gap-2 px-6">
            <p className=" text-slate-600 font-semibold">
              Total Price: <span className='flex gap-4'>₹ {orderitem.totalPrice}</span>
            </p>


          </div>
        </div>


      </div>
    </main>

    }
    
    </>

  );
}
