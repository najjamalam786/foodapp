import { useState } from 'react'
import { MdAdd, MdLogout, MdLogin,  MdOutlineMenuBook, } from "react-icons/md";
import { FaHome,  FaUserCheck, FaUserCircle, FaUserCog, FaUsers } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { TiUserAdd } from "react-icons/ti";
import Logo from "../img/favicon.png";
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
    <header className="z-50 absolute w-screen p-3 px-4 md:p-6 md:px-16 ">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex flex-col items-center  gap-2">
          <img src={Logo} className="w-12 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-semibold"> TIFFINBOX</p>
        </Link>

        <div className="hidden md:flex w-full items-center justify-end gap-8 mb-8 ">
        <ul

className="flex items-center text-textColor gap-12 "
>
<Link to={'/'}>
  <li className="text-md hover:text-lg hover:text-yellow-500 duration-200 transition-all ease-in-out cursor-pointer">
    Home
  </li>
</Link>

<Link to={'/'}>
<li className="text-md hover:text-lg hover:text-yellow-500 duration-200 transition-all ease-in-out cursor-pointer">
  Menu
</li>
  
</Link>

<Link to={'/'}>
<li className="text-md hover:text-lg hover:text-yellow-500 duration-200 transition-all ease-in-out cursor-pointer">
  About Us
</li>

</Link>

<Link to={'/'}>
<li className="text-md hover:text-lg hover:text-yellow-500 duration-200 transition-all ease-in-out cursor-pointer">
  Service
</li>

</Link>
</ul>

<div className="flex items-center gap-8">
<div
  className="relative flex items-center justify-center"
  onClick={showCartHandler}
>
  <img src={AddTiffin} className="text-textColor w-8 h-8  cursor-pointer" alt="FoodBasket" />


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



  className="relative bg-orange-500 rounded-lg p-2 px-4 cursor-pointer hover:bg-yellow-500 duration-200 transition-all ease-in-out">
  {currentUser ? (
    <div className="flex items-center text-white gap-2 ">
      <FaUserCircle size={20}/>
      <p className="text-lg h-8 text-white font-semibold 
       duration-100 transition-all ease-in-out lowercase cursor-pointer">{currentUser.username.slice(0, 6)}...</p>
    </div>
  )
    :
    <FaUserCircle size={30}/>
    }

  {isMenu && <div

    className="w-40 z-10 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-10 right-0 duration-200 transition-all ease-in-out" 
  >




    {currentUser ? (
      <div>

        <p
          className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer  transition-all duration-100 ease-in-out capitalize text-white bg-orange-500 rounded-lg text-base"

        >
          {currentUser.username.split(" ")[0]} <FaUserCheck />
        </p>

        {currentUser.isAdmin &&
          <div className="">
            <Link to={"/createItem"}>
              <p
                className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-orange-300 transition-all duration-100 ease-in-out text-textColor text-base"

              >
                Admin <GrUserAdmin />
              </p>
            </Link>

            <Link to={"/createItem"}>
              <p
                className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-orange-300 transition-all duration-100 ease-in-out text-textColor text-base"

              >
                New Item <MdAdd />
              </p>
            </Link>

          </div>
        }


        <Link to={"/user-orders"}>
          <span
            className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-orange-500 hover:text-white rounded-lg transition-all duration-100 ease-in-out text-textColor text-base"
          >
            Order
            <img src={OrderTiffin} className="w-5 h-5" alt="order" />
          </span>

        </Link>

        <Link to={'/signup'}>
          <p
            className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-orange-500 hover:text-white rounded-lg transition-all duration-100 ease-in-out text-textColor text-base"
            onClick={LogOut}
          >
            New SignUp <TiUserAdd />
          </p>
        </Link>

        <Link to={'/signin'}>
          <p
            className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-orange-500 hover:text-white rounded-lg transition-all duration-100 ease-in-out text-textColor text-base"
            onClick={LogOut}
          >
            Logout <MdLogout />
          </p>
        </Link>
      </div>
    ) : (
      <div>
        <Link to={"/signin"}>
          <p className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-orange-500 hover:text-white rounded-lg transition-all duration-100 ease-in-out text-textColor text-base"

          >
            Login <MdLogin />
          </p>

        </Link>

        <Link to={"/signup"}>
          <p className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-orange-500 hover:text-white rounded-lg transition-all duration-100 ease-in-out text-textColor text-base"

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
      </div>

      {/* mobile */}
      <div className=" flex items-center justify-between md:hidden w-full h-full ">
        <Link to={"/"} className="flex flex-col items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-semibold"> TIFFINBOX</p>
        </Link>


        <div className="flex items-center mb-5 gap-8">
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

          <div className="relative cursor-pointer" onClick={() => setIsMenu(!isMenu)} >

            {currentUser ? <div className="w-full p-2 text-white bg-orange-500 rounded-lg"><FaUserCircle size={30}/></div> 
              : (
                <FaUserCircle size={30} />
              )}

            {isMenu &&
              <div

                className="w-60 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >

                {
                  currentUser ? (
                    <div>


                      <p
                        className="px-4 py-2 pl-4 flex items-center justify-between gap-3 transition-all duration-100 ease-in-out capitalize text-white bg-orange-500 rounded-lg text-base"

                      >
                        {currentUser.username.split(" ")[0]} <FaUserCog size={20}/>
                      </p>

                      {
                        currentUser.isAdmin && (

                          <>
                            <Link to={"/createItem"}>
                              <p className="px-4 py-2 pl-4 flex items-center gap-3 cursor-pointer hover:bg-orange-500 transition-all rounded-lg duration-100 ease-in-out text-textColor text-base">
                                Admin <GrUserAdmin size={20}/>
                              </p>
                            </Link>

                            <Link to={"/createItem"}>
                              <p className="px-4 py-2 pl-4 flex items-cente justify-between gap-3 cursor-pointer hover:bg-orange-500 transition-all rounded-lg duration-100 ease-in-out text-textColor text-base">
                                New Item <MdAdd size={20}/>
                              </p>
                            </Link>
                          </>

                        )}

                      <Link to={"/user-orders"}>
                        <span className="px-4 py-2 pl-4 flex items-cente justify-between gap-3 cursor-pointer hover:bg-orange-500 hover:text-white rounded-lg transition-all duration-100 ease-in-out text-textColor text-base">
                          Orders
                          <img src={OrderTiffin} className="w-5 h-5" alt="order" />

                        </span>
                      </Link>


                    </div>



                  ) : (
                    <div className="">


                      <Link to={"/signin"}>
                        <p
                          className="m-2 p-2 pl-6 rounded-md shadow-md flex items-center justify-between bg-orange-500 gap-3 cursor-pointer hover:bg-yellow-300 transition-all duration-100 ease-in-out text-white  text-base"

                        >
                          Login <MdLogin size={20}/>
                        </p>
                      </Link>
                      {/* <p
                        className="px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"

                      >
                        Login <MdLogin />
                      </p> */}
                      <Link to={"/signup"}>
                        <p
                          className="m-2 p-2 pl-6 rounded-md shadow-md flex items-center justify-between bg-orange-500 gap-3 cursor-pointer hover:bg-yellow-300 transition-all duration-100 ease-in-out text-white  text-base"

                        >
                          Sign Up <TiUserAdd size={20} />
                        </p>
                      </Link>
                    </div>
                  )
                }


                <ul className="flex flex-col ">

                  <Link to={"/"}>

                    <li
                      className="flex items-cente justify-between text-base text-textColor  duration-100 transition-all ease-in-out cursor-pointer hover:bg-orange-500 hover:text-white rounded-lg px-4 py-2 pl-4"

                    >
                      Home <FaHome size={20}/>
                    </li>
                  </Link>
                  <Link to={"/food-menu"}>
                    <li
                      className=" flex items-cente justify-between text-base text-textColor hover:bg-orange-500 hover:text-white rounded-lg duration-100 transition-all ease-in-out cursor-pointer  px-4 py-2 pl-4"

                    >
                      Food Menu <MdOutlineMenuBook size={20}/>
                    </li>

                  </Link>
                  <Link to={"/about"}>
                    <li
                      className="flex items-cente justify-between text-base text-textColor  duration-100 transition-all ease-in-out cursor-pointer hover:bg-orange-500 hover:text-white rounded-lg px-4 py-2 pl-4"

                    >
                      About Us <FaUsers size={20}/>
                    </li>

                  </Link>
                  <Link to={"/service"}>
                    <li
                      className=" flex items-cente justify-between text-base text-textColor  duration-100 transition-all ease-in-out cursor-pointer hover:bg-orange-500 hover:text-white rounded-lg px-4 py-2 pl-4"

                    >
                      Service <FaTruckFast size={20}/>
                    </li>

                  </Link>
                </ul>

                {
                  currentUser &&

                  <>

                    <Link to={"/signin"}><p
                      className="m-2 p-2 pl-6 rounded-md shadow-md flex items-center justify-between bg-gray-300 gap-3 cursor-pointer hover:bg-orange-500 hover:text-white transition-all duration-100 ease-in-out text-black text-base"

                    >New SignUp
                      <TiUserAdd size={20}/>

                    </p></Link>
                    <Link to={"/signin"}><p
                      className="m-2 p-2 pl-6 rounded-md shadow-md flex items-center justify-between bg-red-500 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-white hover:text-red-500 text-base"
                      onClick={LogOut}

                    >
                      Logout <MdLogout size={20}/>

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
