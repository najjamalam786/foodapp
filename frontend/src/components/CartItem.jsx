import React, {  useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems } from "../redux/createSlice/itemSlice";


const CartItem = ({ item, setTotal }) => {

  const { currentUser } = useSelector((state) => state.user);
  const dispatchEvent = useDispatch();
  const [qty, setQty] = useState(item?.quantity);


  const updateQty = async (action, id) => {

    if (action === 'inc') {
      setQty(qty + 1);
      await fetch('/api/user/updatecart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentUser?.email, ID: id, qty: qty + 1 }),
      }).then((res) => {
        res.json().then((allData) => {
          dispatchEvent(addCartItems(allData));
          setTotal(
            allData.reduce((acc, item) => acc + item.price * item.quantity, 0)
          );

        });
      });


    }

    else if (action === 'dec' && qty > 1) {

      setQty(qty - 1);

      await fetch('/api/user/updatecart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentUser?.email, ID: id, qty: qty - 1 }),
      }).then((res) => {
        res.json().then((allData) => {
          dispatchEvent(addCartItems(allData));
          setTotal(
            allData.reduce((acc, item) => acc + item.price * item.quantity, 0)
          );

        });
      });


    }
    else if (action === 'delete') {

      await fetch('/api/user/deleteusercart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentUser?.email, ID: id }),
      }).then((res) => {
        res.json().then((allData) => {
          dispatchEvent(addCartItems(allData));
          setTotal(
            allData.reduce((acc, item) => acc + item.price * item.quantity, 0)
          );

        });
      });
    }



  };


  return (
    <div className="w-full p-1 px-2 rounded-lg bg-white flex items-center gap-2">
      <img
        src={item?.imageURL}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt=""
      />

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-orange-500 font-semibold">{item.name}</p>
        <p className="text-sm block text-slate-500 font-semibold">
          ₹ {parseFloat(item?.price) * qty} {item?.pieces > 1 && `/${item?.pieces}`}
        </p>

      </div>

      {/* button section */}

      <div className="flex flex-col items-center gap-4 ml-auto">

        <FaTrash onClick={() => updateQty("delete", item?._id)} className="text-slate-500 text-xl hover:text-cartNumBg cursor-pointer" />

        <div className="group flex  gap-2  cursor-pointer">
          <div
            onClick={() => {
              updateQty("dec", item?._id);

            }}
          >
            <BiMinus className=" text-orange-500 " />
          </div>

          <p className="w-5 h-5 rounded-sm text-orange-500 font-semibold flex items-center justify-center">
            {qty}
          </p>

          <div
            onClick={() => {
              updateQty("inc", item?._id);
            }}
          >
            <BiPlus className="text-orange-500 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
