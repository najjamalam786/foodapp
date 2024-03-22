import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import NotFound from "../img/NotFound.svg";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems } from "../redux/createSlice/itemSlice";

const FoodContainer = ({flag, dataValue, scrollValue }) => {

  // const rowContainer = useRef();
  const foodContainer = useRef();
 
  const { cartItems } = useSelector((state) => state.item);
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();


  

  const addtocart = async(allData) => {
    dispatch(addCartItems(allData))
    // localStorage.setItem("cartItems", JSON.stringify([...cartItems]));
    
  };

  
  
  
  useEffect(() => {
      foodContainer.current.scrollLeft += scrollValue;
    }, [scrollValue]);

    const handleClick = async(items) => {
      const addUserCart = async() => {
        try {
          // first api call
          
          if(currentUser){
            for(let i = 0; i < cartItems.length; i++){
              if(cartItems[i]._id === items._id){
                
                
                // second API call
                const res = await fetch("/api/user/updatecart", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ID: items._id,
                    qty: cartItems[i].quantity + 1,
                    email: currentUser?.email,
                    // userCart: new Date().toDateString()
                  }),
                });

                await res.json().then(() => {

                  fetchAllUserCart();
                });

                return;
              }
            }
            
            // first API call
            const response = await fetch("/api/user/cart",{
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userCart: items,
                email: currentUser?.email,
                // userCart: new Date().toDateString()
              }),
            });
            
            await response.json().then(() => {
              
              fetchAllUserCart();
              console.log("add to Cart");
            });
          }
        } catch (error) {
          console.log(error);
          
        }
  
      }
      
      addUserCart();
    }

    // last API call
    const fetchAllUserCart = async () => {
          
      const res = await fetch('/api/user/allcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentUser?.email }),
      }
      );
      await res.json().then(async (allData) => {
        addtocart(allData);

      });
      
    }
    
    useEffect(() => {

      // last API call
      fetchAllUserCart();
        
    // dispatch(addCartItems([]))
    // console.log("allCartItems empty");
        
    }, []);
    
    

  return (
    <div
      ref={foodContainer}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {dataValue && dataValue.length > 0 ? (
        dataValue.map((item) => (
          <div
            key={item._id}
            className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

                {currentUser ? (
                  <div
                    className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                  onClick={() => {
                    handleClick(item);
                    // setQty(item?.quantity);
                  }}
                  >
                    <MdShoppingBasket className="text-white text-lg" />
                  </div>
                ) : (
                  <div
                    className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                  >
                    <MdShoppingBasket className="text-white text-lg" />
                  </div>
                )}
              
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.name}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              
              {item?.prices > 1 && (
              <p className="mb-1 text-sm text-gray-500">
                {item?.pieces} <span className="text-sm text-slate-500">pieces</span>
              </p>
              )}
                <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">₹</span> {item?.price}
                </p>
              </div>
              
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default FoodContainer;
