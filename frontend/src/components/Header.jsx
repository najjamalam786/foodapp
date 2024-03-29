import { useState } from 'react'
import { MdAdd, MdLogout, MdLogin, } from "react-icons/md";
import { FaRegUser, FaUserCog } from "react-icons/fa";
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
      if (data.success === false) {
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
            onMouseEnter={() => { setIsMenu(true); }}
            onMouseLeave={() => { setIsMenu(false); }}



            className="relative">
            {currentUser ? (
              <div className="flex items-center gap-1 ">
                <FaRegUser />
                <p className="text-lg h-8 text-textColor hover:text-teal-600 duration-100 transition-all ease-in-out lowercase cursor-pointer">{currentUser.username.slice(0, 6)}...</p>
              </div>
            )
              :
              <img
                src={Avatar}
                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                alt="userprofile"


              />}

            {isMenu && <div

              className="w-40 z-10 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-8 right-0"
            >




              {currentUser ? (
                <div>

                  <p
                    className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer  transition-all duration-100 ease-in-out capitalize text-white bg-teal-600 rounded-lg text-base"

                  >
                    {currentUser.username.split(" ")[0]} <FaUserCog />
                  </p>

                  {currentUser.isAdmin &&
                    <div className="">
                      <Link to={"/createItem"}>
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
            onClick={showCartHandler}
          >
            <img src={AddTiffin} className="text-textColor w-6 h-6  cursor-pointer" alt="FoodBasket" />
            {/* <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" /> */}

            {cartItems && cartItems.length > 0 && (
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}

          </div>

          <div className="relative" onClick={() => setIsMenu(!isMenu)} >

            {currentUser ? <FaRegUser

              className="w-6 text-emerald-600 min-w-[10px] h-6 min-h-[10px]   cursor-pointer " />
              : (
                <img

                  src={Avatar}
                  className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                  alt="userprofile"
                />
              )}

            {isMenu &&
              <div

                className="w-60 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >

                {
                  currentUser ? (
                    <div>


                      <p
                        className="px-4 py-2 flex items-center justify-between gap-3 transition-all duration-100 ease-in-out capitalize text-white bg-teal-600 rounded-lg text-base"

                      >
                        {currentUser.username.split(" ")[0]} <FaUserCog />
                      </p>

                      {
                        currentUser.isAdmin && (

                          <>
                            <Link to={"/createItem"}>
                              <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all rounded-lg duration-100 ease-in-out text-textColor text-base">
                                Admin <GrUserAdmin />
                              </p>
                            </Link>

                            <Link to={"/createItem"}>
                              <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all rounded-lg duration-100 ease-in-out text-textColor text-base">
                                New Item <MdAdd />
                              </p>
                            </Link>
                          </>

                        )}

                      <Link to={"/user-orders"}>
                        <span className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 rounded-lg transition-all duration-100 ease-in-out text-textColor text-base">
                          Orders
                          <img src={OrderTiffin} className="w-5 h-5" alt="order" />

                        </span>
                      </Link>


                    </div>



                  ) : (
                    <div className="">


                      <Link to={"/signin"}>
                        <p
                          className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer  transition-all duration-100 ease-in-out capitalize text-white bg-teal-600 rounded-lg text-base"

                        >
                          Login <MdLogin />
                        </p>
                      </Link>
                      {/* <p
                        className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"

                      >
                        Login <MdLogin />
                      </p> */}
                      <Link to={"/signup"}>
                        <p
                          className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-teal-600 hover:text-white rounded-lg transition-all  duration-100 ease-in-out text-textColor text-base"

                        >
                          Sign Up <TiUserAdd className='w-5 h-5' />
                        </p>
                      </Link>
                    </div>
                  )
                }


                <ul className="flex flex-col ">

                  <Link to={"/"}>

                    <li
                      className="text-base text-textColor  duration-100 transition-all ease-in-out cursor-pointer hover:bg-teal-600 hover:text-white rounded-lg px-4 py-2"

                    >
                      Home
                    </li>
                  </Link>
                  <Link to={"/food-menu"}>
                    <li
                      className="text-base text-textColor hover:bg-teal-600 hover:text-white rounded-lg duration-100 transition-all ease-in-out cursor-pointer  px-4 py-2"

                    >
                      Food Menu
                    </li>

                  </Link>
                  <Link to={"/about"}>
                    <li
                      className="text-base text-textColor  duration-100 transition-all ease-in-out cursor-pointer hover:bg-teal-600 hover:text-white rounded-lg px-4 py-2"

                    >
                      About Us
                    </li>

                  </Link>
                  <Link to={"/service"}>
                    <li
                      className="text-base text-textColor  duration-100 transition-all ease-in-out cursor-pointer hover:bg-teal-600 hover:text-white rounded-lg px-4 py-2"

                    >
                      Service
                    </li>

                  </Link>
                </ul>

                {
                  currentUser &&

                  <>

                    <Link to={"/signin"}><p
                      className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-300 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-black text-base"

                    >New SignUp
                      <TiUserAdd className='w-5 h-5' />

                    </p></Link>
                    <Link to={"/signin"}><p
                      className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-red-500 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-white text-base"
                      onClick={LogOut}

                    >
                      Logout <MdLogout />

                    </p></Link>
                  </>
                }


              </div>}

          </div>
        </div>
      </div>
    </header>
  );
}
