import React, { useEffect, useState } from "react";
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import HomeContainer from "./Section01/HomeContainer";
import MenuContainer from "./Section02/MenuContainer";
// import FoodContainer from "../components/FoodContainer";
import { useDispatch, useSelector } from "react-redux";
import { itemShowCart } from "../redux/createSlice/itemSlice";
import { pageLoader } from "../redux/createSlice/orderSlice";
import { TbPaperBag } from "react-icons/tb";




const HomePage = () => {
  
  const { cartItems, foodItems, showCart } = useSelector((state) => state.item);
  const {currentUser} = useSelector(state => state.user);
  const [scrollValue, setScrollValue] = useState(0);
  const dispatchEvent = useDispatch();
  // console.log("Working ", foodItems);

  const showCartHandler = () => {
    dispatchEvent(itemShowCart(!showCart));
   
  }

  useEffect(() => {
    dispatchEvent(pageLoader(true));

    

    setTimeout(() => {
      dispatchEvent(pageLoader(false));
    }, 800);
  }, [scrollValue, showCart]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center ">
      <HomeContainer />
      <MenuContainer />



      {/* <section className="w-full my-6">

        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Our fresh & healthy fruits
          </p>

          
        

          <div className="hidden md:flex gap-3 items-center">
            <div
              
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(-200)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </div>
            <div
              
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(200)}
            >
              <MdChevronRight className="text-lg text-white" />
            </div>
          </div>
        </div>
        <FoodContainer
          scrollValue={scrollValue}
          flag={true}
          dataValue={foodItems?.filter((n) => n.category === "fruits")}
        />
       
       
      </section> */}
      
      {currentUser && cartItems && cartItems.length > 0 && (
              <div className='fixed z-10 bottom-14 right-14 cursor-pointer bg-orange-500 p-2 rounded-full'
              onClick={showCartHandler}
              >

                <TbPaperBag size={35} className="text-white cursor-pointer" alt="FoodBasket"/>

                <div className=" absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                  <p className="text-xs text-white font-semibold">
                    {cartItems.length}
                  </p>
                </div>

              </div>

            )}
      
    </div>
  );
};

export default HomePage;
