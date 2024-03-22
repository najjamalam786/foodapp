import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems } from "../redux/createSlice/itemSlice";

let items = [];

const CartItem = ({ item, setFlag, flag}) => {
  
  const { cartItems } = useSelector((state) => state.item);
  const { currentUser } = useSelector((state) => state.user);
  const dispatchEvent = useDispatch();
  // console.log(item)
  const [qty, setQty] = useState(item?.quantity);
  // const [item, setCart] = useState([]);
  
  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatchEvent(addCartItems(items));
    
  };

  const updateQty = async(action, id) => {
    if(action === 'inc') {
      await fetch('/api/user/updatecart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: currentUser?.email, ID: id, qty: qty+1}),
      });
      console.log("quantity",qty+1);

    } else if(action === 'dec') {
      await fetch('/api/user/updatecart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: currentUser?.email, ID: id, qty: qty-1}),
      });

      console.log("quantity",qty-1);
    }
  
    
    
   
  
    if (qty === 1) {
      items = cartItems.filter((item) => item._id !== id);
      setFlag(flag + 1);
      cartDispatch();
    } 
    cartDispatch();
    
  
};

  useEffect(() => {

    // const fetchCartItems = async() => {
    //   // console.log("email", currentUser?.email);
    //   const response = await fetch('/api/user/cartData', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({email: currentUser?.email}),
    //   }
    //   );
    //   await response.json().then((data) => {

    //     items = data;
    //     cartDispatch();
    //   });
    // }

    // fetchCartItems();

    // items = cartItems;
  }, []);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={item?.imageURL}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt=""
      />

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item.name}</p>
        <p className="text-sm block text-gray-300 font-semibold">
        ₹ {parseFloat(item?.price) * qty} {item?.pieces > 1 && `/${item?.pieces}`}
        </p>
      </div>

      {/* button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <div
          onClick={() => {
            updateQty("remove", item?._id);
            setQty(qty - 1);
          }}
        >
          <BiMinus className="text-gray-50 " />
        </div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>

        <div
          onClick={() => {
            updateQty("add", item?._id);
            setQty(qty + 1);
          }}
        >
          <BiPlus className="text-gray-50 " />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
