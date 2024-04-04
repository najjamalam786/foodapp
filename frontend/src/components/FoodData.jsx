import React from 'react'

export default function FoodData({food}) {

  
    return (
        <main className="flex items-center justify-center gap-2">
          <img
            src={food?.imageURL}
            className="w-20 h-20 max-w-[60px] rounded-full object-contain"
            alt=""
          />
    
          {/* name section */}
            
            
            
          {food.name === "Monthly Subscription" ? (
            <div className="flex flex-col align-bottom gap-4 overflow-hidden">
              <p className="text-base font-semibold text-slate-600">Welcome to Premimum Membership</p>
                <p className='text-base text-slate-500 font-semibold'>
                    Fast Delivery
                </p>
                {/* <div className='w-10 h-10 bg-white rounded-full overflow-hidden'>
                    <img src={Delivery} className='w-full h-full object-contain' alt="bike img" />
                </div> */}
            </div>
            ) : (
            <div className="flex flex-col align-bottom gap-4 overflow-hidden">

            <p className="text-base font-semibold text-slate-600">{food.name}</p>
            <p className="text-sm block text-slate-500 font-semibold ">
                qty. {food.quantity}
              </p>
          </div>
          )}
    
          {/* button section */}
              <div className="flex flex-col items-end gap-2 ml-auto">
              <p className=" block text-slate-600 font-semibold">
              ₹ {food.price}
            </p>
              <p className="text-sm block  text-slate-500  font-semibold">
             cal. {food.calories}
            </p>

              </div>
    
              
            
        </main>
      );
}
