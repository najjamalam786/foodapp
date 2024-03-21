import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import NotFound from "../img/NotFound.svg";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems } from "../redux/createSlice/itemSlice";

const FoodContainer = ({ flag, dataValue }) => {

  // const rowContainer = useRef();
  const foodContainer = useRef();
 
  const [itemID, setItemID] = useState(null);
  const { cartItems } = useSelector((state) => state.item);
  const { currentUser } = useSelector((state) => state.user);
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  

  const addtocart = async(allData) => {
    await dispatch(addCartItems(allData))
    localStorage.setItem("cartItems", JSON.stringify([...cartItems]));
    
  };

  
  
  
  // useEffect(() => {
    //   rowContainer.current.scrollLeft += scrollValue;
    // }, [scrollValue]);
    
    useEffect(() => {

      // last API call
      const fetchUserCart = async(data) => {

        try {
  
          const response = await fetch("/api/user/cart",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userCart: data,
              email: currentUser?.email,
              // userCart: new Date().toDateString()
            }),
          });
          
          const dataMessage = await response.json();
          
          if(dataMessage) {
            console.log(dataMessage);
          }else{
            console.log("not Working Cart");
          }
          
        } catch (error) {
          console.log(error);
          
        }
        
      } 
      
      // second API call
      const fetchCartItems = async() => {
  
        try {
          const response = await fetch(`/api/item/get/${itemID}`);
          await response.json().then((data) => {
            
            
            fetchUserCart(data);
          });
        } catch (error) {
          console.log(error);
  
        }
      }


      // first API call
      const fetchAllUserCart = async() => {

        const res = await fetch('/api/user/cartData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: currentUser?.email}),
        }
        );
        await res.json().then(async(allData) => {

          addtocart(allData);
          
          if(itemID){

            for(let i = 0; i < allData.length; i++){
              if(allData[i]._id === itemID){

                // setQty(allData[i].quantity);
                
                // cartItems[i].quantity = qty;
                // dispatch(addCartItems(cartItems[i].quantity + 1));
                const response = await fetch("/api/user/updatecart",{
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ID: itemID,
                    qty,
                    email: currentUser?.email,
                    // id: itemID,
                    // userCart: new Date().toDateString()
                  }),
                });

                response.json().then((data) => {
                  console.log(data);
                })


                
                console.log("duplicate value", );
                setItemID(null);
                return;
              }
            }
            
            fetchCartItems();
            setItemID(null);
          }
            

            
            // console.log(data.length);
            // console.log(data[1][0]._id);
            // dispatch(addCartItems(data));
          });
          
        }

        fetchAllUserCart();
        
        
    }, [itemID, currentUser]);
    
    

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
                    setItemID(item._id);
                    setQty(qty + 1);
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
              <p className="mt-1 text-sm text-gray-500">
                {qty + 1} quantity
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
