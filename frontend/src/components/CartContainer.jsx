import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import Logo from "../img/favicon.png";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../img/emptyCart.svg";
import { addTotalPrice, itemShowCart } from "../redux/createSlice/itemSlice";


import CartItem from "./CartItem";

const CartContainer = () => {

  const { cartItems, showCart } = useSelector((state) => state.item);
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  
  const [total, setTotal] = useState(0);
  




  const showCartHandler = () => {
    dispatch(itemShowCart(!showCart));  
  };

  
   
  
  
  useEffect(() => {

    if(cartItems.length > 0){
      setTotal(
        cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      );
    }
    // dispatch(addCartItems([]))
  }, []);

  return (
    
    <div
    
    className="w-full h-full rounded-t-[2rem] bg-green-300 drop-shadow-md flex flex-col"
    >
      
    
      <div className="w-full  flex items-center rounded-t-[2rem] justify-between p-4 cursor-pointer  bg-green-300">
      <p className="text-textColor text-lg font-semibold">Cart</p>

        
        <div>
        <p
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          // onClick={clearCartItem}

        >
          <img src={Logo} alt="logo" className="w-8 h-8 object-contain" />

        </p>
        </div>

        <div onClick={showCartHandler}>
          <IoMdCloseCircle className=" w-8 text-3xl hover:text-5xl hover:text-red-600" />
        </div>

       
      </div>

      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* cart Items section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll no-scrollbar">
            {/* cart Item */}
            {
              cartItems.slice(0).reverse().map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  setTotal={setTotal}
                  
                />
              ))}
          </div>

          {/* cart total section */}
          <div className="w-full flex-1  bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">₹ {total}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">₹ 20</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
              ₹ {total + 2.5}
              </p>
            </div>

            {currentUser ? (
              <Link to="/order-create" 
                
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr text-center from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                onClick={() => {
                  showCartHandler();
                  dispatch(addTotalPrice(total + 20));
                }}
              >
                Check Out
              </Link>
            ) : (
              <button
                
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Login to check out
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    
    </div>
    
  );
};

export default CartContainer;
