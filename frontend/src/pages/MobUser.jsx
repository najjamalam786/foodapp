import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { MdAddLocation, MdKeyboardArrowRight, MdLogout, MdOutlineFoodBank } from 'react-icons/md'
import { RiCustomerService2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { addCartItems, itemShowCart } from '../redux/createSlice/itemSlice';
import MemberLogo from "../img/member_logo.png"
import Logo from "../img/food_logo.png"
import { TiHomeOutline, TiUserAdd } from 'react-icons/ti'
import { CgUserList } from "react-icons/cg";
import { IoCallOutline } from "react-icons/io5";
import { TbPaperBag } from 'react-icons/tb'
import { FaPeopleGroup, FaRegCircleQuestion, FaRegHandshake } from 'react-icons/fa6'
import { FaPlus } from 'react-icons/fa';
import { deleteFailure, deleteSuccess, deleteUserStart } from '../redux/createSlice/userSlice';
import { pageLoader } from '../redux/createSlice/orderSlice';
export default function MobUser() {

    const dispatchEvent = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { cartItems, showCart } = useSelector((state) => state.item);


    const showCartHandler = () => {
        dispatchEvent(itemShowCart(!showCart));
    }

    const handleLogOut = async () => {
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

    useEffect(() => {
        dispatchEvent(pageLoader(true));
        setTimeout(() => {
            dispatchEvent(pageLoader(false));
        },500);
    }, [])

    return (
        <main className='w-full bg-orange-100 flex flex-col gap-4'>


            <div className="bg-white border">

                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <Link to={'/'}>
                            <img src={Logo} alt="logo" className="w-[140px] " />

                        </Link>
                        <p className="text-xl bg-gradient-to-tr from-[#02623d] to-[#00f6b4] bg-clip-text text-transparent capitalize flex gap-2  font-semibold"> Hey! {currentUser.username} </p>
                    </div>

                    <div
                        className="relative flex items-center justify-center right-5"
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
                </div>


                <div className="w-full mt-4  p-4 flex flex-row gap-4">



                    <div className="w-full flex flex-col gap-4">

                        {
                            currentUser.isAdmin ? (
                                <Link to={'/createItem'}>
                                    <div className=" border flex items-center justify-between px-6 py-2 text-slate-600 rounded-md">
                                        <p className="text-base font-semibold ">Add Items</p>
                                        <FaPlus color='#05339d' size={15} />
                                    </div>

                                </Link>
                            ) : (
                                <Link to={'/'}>
                                    <div className=" border flex items-center justify-between px-6 py-2 text-slate-600 rounded-md">
                                        <p className="text-base font-semibold ">Home</p>
                                        <TiHomeOutline color='#05339d' size={20} />
                                    </div>

                                </Link>
                            )
                        }
                        <Link to={'/user-orders'}>

                            <div className=" border flex items-center justify-between px-6 py-2 text-slate-600 rounded-md">
                                <p className="text-base font-semibold ">Orders</p>
                                <MdOutlineFoodBank color='#0f059d' size={25} />

                            </div>
                        </Link>


                    </div>

                    <div className="w-full flex flex-col gap-4">
                        <Link to={'/user-address'}>
                            <div className=" border flex items-center justify-between px-6 py-2 rounded-md">
                                <p className="text-base text-slate-600 font-semibold ">Your Address</p>
                                <MdAddLocation color='#0f059d' size={25} />
                            </div>

                        </Link>
                        <Link to={'/help-center'}>
                            <div className=" border flex items-center justify-between px-6 py-2 text-slate-600 rounded-md">
                                <p className="text-base font-semibold ">Help center</p>
                                <RiCustomerService2Fill color='#0f059d' size={20} />
                            </div>

                        </Link>

                    </div>



                </div>
            </div>
            <div className=" border-2 bg-white flex items-center justify-between px-6 py-4 ">
                <div className="flex gap-4 place-items-end">
                    <img src={MemberLogo} alt="" className="w-10" />
                    <div className='flex flex-col gap-1'>
                        <p className="text-base font-semibold ">Our Prime Member</p>
                        <p className="text-[12px]  ">Become Prime Member and get exclusive offers</p>
                    </div>
                </div>
                <Link to={'/user-member'}>

                    <p className="text-base flex items-center gap-4 border bg-gradient-to-tr from-[#173ff5] to-[#001a6e] text-white font-semibold px-4 py-2 pr-8 rounded-md">
                        <FaPeopleGroup color='white' size={25} />

                        Your Subscription</p>
                </Link>

            </div>


            <div className=" border-2 bg-white flex flex-col gap-6 py-8 ">
                <div className=" bg-white flex items-center justify-between px-6 gap-4 cursor-pointer">
                    <div className="flex items-center justify-start gap-8">

                        <FaRegHandshake className='text-[#ff9e43]' size={25} />
                        <div className="flex flex-col gap-1">
                            <p className="text-base font-semibold ">Our Service</p>
                            <p className="text-sm text-slate-600">Here are some of our services</p>
                        </div>
                    </div>
                    <MdKeyboardArrowRight className='text-slate-500' size={25} />
                </div>

                <Link to={'/about-us'}>
                    <div className=" bg-white flex items-center justify-between px-6  gap-4 cursor-pointer">

                        <div className="flex items-center justify-start gap-8">

                            <CgUserList className='text-[#ff9e43]' size={25} />
                            <div className="flex flex-col gap-1">
                                <p className="text-base font-semibold ">About Us</p>
                                <p className="text-sm text-slate-600">Who we are and what we do </p>
                            </div>
                        </div>
                        <MdKeyboardArrowRight className='text-slate-500' size={25} />
                    </div>
                </Link>

                <div className=" bg-white flex items-center justify-between px-6  gap-4 cursor-pointer">
                    <div className="flex items-center justify-start gap-8">

                        <FaRegCircleQuestion className='text-[#ff9e43]' size={25} />
                        <div className="flex flex-col gap-1">
                            <p className="text-base font-semibold ">FAQs</p>
                            <p className="text-sm text-slate-600">Frequently asked questions </p>
                        </div>
                    </div>
                    <MdKeyboardArrowRight className='text-slate-500' size={25} />
                </div>

                <div className=" bg-white flex items-center justify-between px-6  gap-4 cursor-pointer">
                    <div className="flex items-center justify-start gap-8">

                        <IoCallOutline className='text-[#ff9e43]' size={25} />
                        <div className="flex flex-col gap-1">
                            <p className="text-base font-semibold ">Contact Us</p>
                            <p className="text-sm text-slate-600">Get in touch with us</p>
                        </div>
                    </div>
                    <MdKeyboardArrowRight className='text-slate-500' size={25} />
                </div>

            </div>


            <div className="bg-white py-6 flex flex-col gap-8">
                <Link to={"/signup"}>
                    <div className=" bg-white flex items-center justify-between px-6 cursor-pointer" onClick={handleLogOut}>
                        <p className="text-base font-semibold text-blue-600">New Account Create</p>
                        <TiUserAdd className='text-blue-600' size={25} />
                    </div>
                </Link>
                <Link to={"/signin"}>
                    <div className=" bg-white flex items-center justify-between px-6 cursor-pointer" onClick={handleLogOut}>
                        <p className="text-base font-semibold text-cartNumBg">Log Out</p>
                        <MdLogout className='text-cartNumBg' size={25} />
                    </div>
                </Link>
            </div>
            <Link to={"/help-center"}>
                <div className=" border-2 bg-white flex items-center justify-between px-6 py-4 cursor-pointer">
                    <p className="text-base font-semibold text-blue-600">Help center</p>
                    <RiCustomerService2Fill className='text-blue-600' size={25} />
                </div>
            </Link>

        </main>
    )
}
