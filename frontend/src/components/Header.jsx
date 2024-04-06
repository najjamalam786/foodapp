import { useState } from 'react'
import { MdAdd, MdLogout, MdLogin, MdOutlineMenuBook, } from "react-icons/md";
import { FaHome, FaUserCheck, FaUserCircle, FaUserCog, FaUsers } from "react-icons/fa";
import { TbPaperBag } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuPackageCheck } from "react-icons/lu";
import { GrUserAdmin } from "react-icons/gr";
import { TiUserAdd } from "react-icons/ti";
import Logo from "../img/food_logo.png"
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { deleteFailure, deleteSuccess, deleteUserStart } from '../redux/createSlice/userSlice';
import { useDispatch } from 'react-redux';
import { addCartItems, itemShowCart } from '../redux/createSlice/itemSlice';





export default function Header() {

  const { cartItems, showCart } = useSelector((state) => state.item);
  const { currentUser } = useSelector((state) => state.user);
  const dispatchEvent = useDispatch();

  const [isMenu, setIsMenu] = useState(false);

  const LogOut = async () => {
    try {
      dispatchEvent(addCartItems([]));
      dispatchEvent(deleteUserStart())
      const res = await fetch('api/user/logout')
      const data = await res.json()
      if (data.success === false) {
        dispatchEvent(deleteFailure(data.message))

      }

      dispatchEvent(deleteSuccess(data));
      

    } catch (error) {
      dispatchEvent(deleteFailure(error.message))
    }
  }


  const showCartHandler = () => {
    dispatchEvent(itemShowCart(!showCart));

  }

  return (
    <header className="z-50 top-0 absolute w-screen p-3 px-4 md:p-6 md:px-16 ">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="">
          <img src={Logo} className="w-[180px] object-cover" alt="logo" />
        </Link>

        <div className="hidden md:flex w-full items-center justify-end gap-8 mb-8 ">
          <ul

            className="flex items-center text-textColor gap-12 "
          >
            <Link to={'/'}>
              <li className="text-md hover:text-lg  hover:text-orange-500 duration-200 cursor-pointer relative before:absolute before:rounded-lg before:content before:w-4 before:h-1 before:-bottom-1 before:left-0 before:bg-orange-600 hover:before:w-full transition-all ease-in-out before:duration-300">
                Home
              </li>
            </Link>

            <Link to={'/about-us'}>
              <li className="text-md hover:text-lg hover:text-orange-500 duration-200 cursor-pointer relative before:absolute before:rounded-lg before:content before:w-4 before:h-1 before:-bottom-1 before:left-0 before:bg-orange-600 hover:before:w-full transition-all ease-in-out before:duration-300">
                About Us
              </li>

            </Link>

          </ul>

          <div className="flex items-center gap-8">
            <div
              className="relative flex items-center justify-center"
              onClick={showCartHandler}
            >
              <TbPaperBag size={25} className="text-textColor cursor-pointer" alt="FoodBasket" />


              {cartItems && cartItems.length > 0 && (
                <div className=" absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center">
                  <p className="text-xs text-white font-semibold">
                    {cartItems.length}
                  </p>
                </div>
              )}

            </div>

            <div
              onMouseEnter={() => { setIsMenu(true); }}
              onMouseLeave={() => { setIsMenu(false); }}



              className="relative bg-orange-500 rounded-lg p-2 px-4 cursor-pointer hover:bg-cartNumBg duration-200 transition-all ease-in-out">
              {currentUser ? (
                <div className="flex items-center text-white gap-2 ">
                  <FaUserCircle size={20} />
                  <p className="text-lg h-8 text-white font-semibold 
       duration-100 transition-all ease-in-out lowercase cursor-pointer">{currentUser.username.slice(0, 6)}...</p>
                </div>
              )
                :
                <FaUserCircle size={30} />
              }

              {isMenu && <div

                className="w-[280px] z-10 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-10 right-0 duration-200 transition-all ease-in-out"
              >




                {currentUser ? (
                  <div>

                    <p
                      className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer  transition-all duration-100 ease-in-out capitalize text-white bg-orange-500 rounded-lg text-base"

                    >
                      {currentUser.username.split(" ")[0]} <FaUserCheck size={20} />
                    </p>

                    {currentUser.isAdmin &&
                      <div className="">
                        <Link to={"/createItem"}>
                          <p
                            className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-orange-300 transition-all duration-100 ease-in-out text-textColor text-base"

                          >
                            Admin <GrUserAdmin size={20} />
                          </p>
                        </Link>

                        <Link to={"/createItem"}>
                          <p
                            className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-orange-300 transition-all duration-100 ease-in-out text-textColor text-base"

                          >
                            New Item <MdAdd size={20} />
                          </p>
                        </Link>

                      </div>
                    }


                    <Link to={"/user-orders"}>
                      <span
                        className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-orange-500 hover:text-white rounded-lg transition-all duration-100 ease-in-out text-textColor text-base"
                      >
                        Order
                        <LuPackageCheck size={20} />
                      </span>

                    </Link>
                    <Link to={"/user-member"}>
                      <span
                        className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-orange-500 hover:text-white rounded-lg transition-all duration-100 ease-in-out text-textColor text-base"
                      >
                        Food Membership
                        <FaPeopleGroup size={20} />
                      </span>

                    </Link>

                    <Link to={'/signup'}>
                      <p
                        className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-orange-500 hover:text-white rounded-lg transition-all duration-100 ease-in-out text-textColor text-base"
                        onClick={LogOut}
                      >
                        New SignUp <TiUserAdd size={20} />
                      </p>
                    </Link>

                    <Link to={'/signin'}>
                      <p
                        className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-cartNumBg hover:text-white rounded-lg transition-all duration-100 ease-in-out text-textColor text-base"
                        onClick={LogOut}
                      >
                        Logout <MdLogout size={20} />
                      </p>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link to={"/signin"}>
                      <p className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-orange-500 hover:text-white rounded-lg transition-all duration-100 ease-in-out text-textColor text-base"

                      >
                        Login <MdLogin size={20} />
                      </p>

                    </Link>

                    <Link to={"/signup"}>
                      <p className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-orange-500 hover:text-white rounded-lg transition-all duration-100 ease-in-out text-textColor text-base"

                      >
                        Sign Up <TiUserAdd size={20} />
                      </p>

                    </Link>
                  </div>
                )}


              </div>}




            </div>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className=" flex items-center justify-between md:hidden w-full h-full ">
        <Link to={"/"} className="w-[120px] ">
          <img src={Logo} alt="logo" className="w-full h-full object-contain" />
        </Link>


        <div className="flex items-center mb-5 gap-8">
          <div
            className="relative flex items-center justify-center"
            onClick={showCartHandler}
          >
            <TbPaperBag className="text-textColor w-6 h-6  cursor-pointer" alt="FoodBasket" />
            {/* <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" /> */}

            {cartItems && cartItems.length > 0 && (
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}

          </div>

          <div className="relative cursor-pointer" >

            {currentUser ?
              (
                <Link to={'/user-profile'}>
                  <div className="w-full flex gap-2 items-center p-2 text-white bg-orange-500 rounded-lg"><FaUserCircle size={20} />

                    <p className="text-slate-50">You</p>

                  </div>
                </Link>
              )
              : (

                <Link to={'/signin'}>
                  <div className="w-full p-2 text-orange-500 rounded-lg"><FaUserCircle size={30} /></div>
                </Link>
              )}



          </div>
        </div>
      </div>
    </header>
  );
}
