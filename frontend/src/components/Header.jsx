import {useState} from 'react'
import {  MdAdd, MdLogout, MdLogin,  } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { TiUserAdd } from "react-icons/ti";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import AddTiffin from "../img/pngwing.png";
import OrderTiffin from "../img/order_tiffin.png";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { deleteFailure, deleteSuccess, deleteUserStart } from '../redux/createSlice/userSlice';
import { useDispatch } from 'react-redux';
import { addCartItems, itemShowCart } from '../redux/createSlice/itemSlice';
import { pageLoader } from '../redux/createSlice/orderSlice';





export default function Header() {

  const { cartItems, showCart } = useSelector((state) => state.item);
  const { currentUser } = useSelector((state) => state.user);
  const dispatchEvent = useDispatch();

  const [isMenu, setIsMenu] = useState(false);

 const LogOut = async () => {
   dispatchEvent(pageLoader(true));
   try {
      dispatchEvent(addCartItems([]));
      dispatchEvent(deleteUserStart())
      const res = await fetch('api/user/logout')
      const data = await res.json()
      if(data.success === false ){
        dispatchEvent(pageLoader(false));
        dispatchEvent(deleteFailure(data.message))
        
      }

      dispatchEvent(deleteSuccess(data));
      setTimeout(() => {
        dispatchEvent(pageLoader(false));
      }, 2000);
          
    } catch (error) {
    dispatchEvent(deleteFailure(error.message))
   }
 }

  
 const showCartHandler = () => {
   dispatchEvent(itemShowCart(!showCart));
  
 }

  return (
    <header className="z-50 w-screen p-3 px-4 md:p-6 md:px-16 ">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold"> City</p>
        </Link>

          <ul
            
            className="flex items-center gap-12 "
          >
            <Link to={'/'}>
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            </Link>
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li>
          </ul>

        <div className="flex items-center gap-8">
          <div
            className="relative flex items-center justify-center"
            onClick={showCartHandler}
          >
            <img src={AddTiffin} className="text-textColor w-6 h-6  cursor-pointer" alt="FoodBasket" />
            
            
            {cartItems && cartItems.length > 0 && (
              <div className=" absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
            
          </div>

          <div 
          onMouseEnter={() => {setIsMenu(true);}}
          onMouseLeave={() => {setIsMenu(false);}}
          
          
            className="relative">
            <img
              src={currentUser ? currentUser.avatar : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              
              
            />
            
              {isMenu && <div
                
                className="w-40 z-10 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-10 right-0"
              >
                
                 
                  
                
                {currentUser ? (
                  <div>
                    {currentUser.isAdmin ? (
                      <div className="">
                      <Link to={"/admin-profile"}>
                        <p
                          className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                          
                        >
                          Admin <GrUserAdmin />
                        </p>
                      </Link>

                      <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>

                      </div>
                    ) : (
                    <div>
                    <Link to={"/profile"}>
                      <p
                        className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                        
                      >
                        Profile <FaUserCog />
                      </p>
                    </Link>



                    </div>
                    )
                    }
                     
                  
                  <Link to={"/user-orders"}>
                  <span
                    className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  >
                    Order 
                  <img src={OrderTiffin} className="w-5 h-5" alt="order" />
                  </span>

                  </Link>

                  <Link to={'/signin'}>
                  <p
                    className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={LogOut}
                  >
                    Logout <MdLogout />
                  </p>
                  </Link>
                  </div>
                ) : (
                  <div>
                  <Link to={"/signin"}>
                    <p className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"

                    >                    
                    Login <MdLogin />
                    </p>
                    
                  </Link>

                  <Link to={"/signup"}>
                    <p className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"

                    >                    
                    Sign Up <TiUserAdd />
                    </p>
                    
                  </Link>
                  </div>
                )}

                
              </div>}

            
              
            
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full ">
      <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold"> City</p>
        </Link>
        

        <div className="flex items-center gap-8">
        <div
          className="relative flex items-center justify-center"
          
        >
            <img src={AddTiffin} className="text-textColor w-6 h-6  cursor-pointer" alt="FoodBasket" />
          {/* <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" /> */}
          
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                4
              </p>
            </div>
          
        </div>

        <div className="relative">
        
          <img
            
            src={Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userprofile"
            
          />
          
            <div
              
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              
                <Link to={"/createItem"}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              

              <ul className="flex flex-col ">
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  
                >
                  Home
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  
                >
                  Menu
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  
                >
                  About Us
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  
                >
                  Service
                </li>
              </ul>

              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                
              >
                Logout <MdLogout />
              </p>
            </div>
          
        </div>
        </div>
      </div>
    </header>
  );
}
