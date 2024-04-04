import React, { useEffect, useState } from 'react'
import MemberImg from "../img/monthlySub.png"
import { useSelector } from 'react-redux';

export default function MemberOrder({ memberorder }) {

  const [userDate, setUserDate] = useState(2);
  const [expireDate, setExpireDate] = useState("");
  // const [expireUser, setExpireUser] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {

    if (memberorder.monthlySub !== undefined) {

      let date = (new Date(memberorder.orderDate.slice(4, 15))).getTime();
      let today = (new Date()).getTime();
      let msDay = 24 * 60 * 60 * 1000; // milliseconds per day

      let days = Math.floor((today - date) / msDay);
      
      setUserDate(userDate - days);

      const currentDate = new Date().toDateString();

      if(currentDate === memberorder.expireDate){

        const userUpdate = async () => {

          try {
            await fetch("/api/user/expiremonthlysub", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: currentUser.email,
                _id: memberorder._id,
                monthlySub: false
              }),
            });



          } catch (error) {
            console.log(error);
          }
        }

        userUpdate();
      }
      setExpireDate(memberorder.expireTillDate);
    }


    

  },[])
  return (

    <>
    {
      memberorder.monthlySub !== undefined && <main className="flex flex-col lg:flex-row gap-2">
      <div className="w-full flex flex-col gap-4 flex-1 rounded-lg border border-orange-500 ">

        <div className={`w-full flex px-6 py-2 overflow-hidden ${memberorder.monthlySub === false ? "bg-gradient-to-tr from-cartNumBg to-orange-300 " : "bg-gradient-to-tr from-orange-600 to-orange-300"}  rounded-t-lg justify-between`}>
          <p className=" text-white  ">{memberorder.orderDate} </p>
          <p className='text-white'>{memberorder.orderTime}</p>

        </div>
        
        <div className=" px-6 pb-4">
          <div className="w-full px-6 py-4 border bg-gradient-to-tr from-blue-800 to-sky-400 rounded-lg flex flex-col ">
          

          <main className="flex items-center justify-center gap-2">
          <img
            src={MemberImg}
            className="w-20 h-20 max-w-[60px] rounded-full object-contain"
            alt=""
          />
    
          {/* name section */}
            
          
            <div className="flex flex-col align-bottom gap-4 overflow-hidden">
              <p className="text-sm sm:text-lg font-semibold text-white">Welcome to Premimum Membership</p>
                <p className='text-[12px] sm:text-sm text-white font-semibold'>
                  Fast Delivery  
                </p>
                {/* <div className='w-10 h-10 bg-white rounded-full overflow-hidden'>
                    <img src={Delivery} className='w-full h-full object-contain' alt="bike img" />
                </div> */}
            </div>
            
    
          {/* button section */}
              <div className="flex flex-col items-end gap-2 ml-auto">
              <p className="text-sm sm:text-lg block text-white font-semibold">
              ₹ {memberorder.totalPrice}

              </p>
            {
              memberorder.monthlySub === false ?
              (
                <>
                  <p className="text-lg block  text-red-600  font-semibold">
                  Expire
                </p>
                  <p className=" text-[12px] sm:text-sm block  text-white  font-semibold">
                  Your month is Expire
                </p>
                </>
               
              ) : (
                <>
                <p className="text-sm block  text-white  font-semibold">
                {userDate} days left
              </p>
  
                <p className="text-[12px] sm:text-sm block  text-white  font-semibold">
                You are a member till {expireDate}
              </p>
                  </>
              )
            }

              </div>
    
              
            
        </main>

        </div>

          </div>
        </div>

      

      {/* Total price section */}
      <div name="totalPrice" className="flex flex-col gap-4 w-full lg:w-[400px] lg:h-full">
        <div className="w-full py-6 px-6 rounded-lg border flex flex-col gap-4">

          <p className="text-sm sm:text-lg font-semibold text-orange-500"><u>Food Delivery Address</u></p>

          <div className="flex flex-col overflow-hidden">

            <p className="text-sm sm:text-lg text-gray-400">Landmark: <span className='text-slate-600'>{memberorder.shippingAddress.landmark}</span></p>
            <p className="text-sm sm:text-lg text-gray-400">Address: <span className='text-slate-600'>{memberorder.shippingAddress.address}</span></p>
            <p className="text-sm sm:text-lg  text-gray-400">District: <span className='text-slate-600'>{memberorder.shippingAddress.district}</span></p>
            <p className="text-sm sm:text-lg text-gray-400">pincode: <span className='text-slate-600'>{memberorder.shippingAddress.pincode}</span></p>
            <p className="text-sm sm:text-lg text-gray-400">Phone number: <span className='text-slate-600'>{memberorder.shippingAddress.newMobile}</span></p>



          </div>




          <div className="flex flex-col items-end gap-2 px-6">
            <p className="text-sm sm:text-lg text-slate-600 font-semibold">
              Total Price: <span className='flex gap-4'>₹ 4499 </span>
            </p>


          </div>
        </div>


      </div>
    </main>
    }
    </>
  )
}
