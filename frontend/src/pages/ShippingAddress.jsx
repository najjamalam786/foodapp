import React, { useEffect, useState } from 'react'
import NotFound from "../img/NotFound.svg";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { addCartItems } from '../redux/createSlice/itemSlice';
import Logo from '../img/food_logo.png';
import OrderAddress from '../components/OrderAddress';
import { confirmOrderPlaced } from '../redux/createSlice/orderSlice';


export default function ShippingAddress() {

    const { currentUser } = useSelector((state) => state.user);
    const { cartItems, totalPrice } = useSelector((state) => state.item);
    const { monthlySub } = useSelector((state) => state.order);
    const [orderAddress, setOrderAddress] = useState();
    const [checkBox, setCheckBox] = useState({
        type: '',
    });
    const [index, setIndex] = useState();
    //   const [defaultaddress, setDefaultAddress] = useState();

    const [flag, setflag] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({

        landmark: "",
        address: "",
        newMobile: "",
        pincode: "",
        district: "Patna",

    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.id]: e.target.value.replace(/\s+/g, ' '),
        })


    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        // order create api
        try {
            
            if (monthlySub === true) {
                await fetch("/api/user/monthlysub", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        mobile: currentUser.mobile,

                        username: currentUser.username,
                        email: currentUser.email,
                        monthlySub: true,
                        shippingAddress: {

                            landmark: formData.landmark.trim(),
                            address: formData.address.trim(),
                            pincode: formData.pincode.trim(),
                            newMobile: formData.newMobile.trim(),
                            district: formData.district.trim()
                        },
                        totalPrice: totalPrice,
                    }),
                })
                
            }
            else {
                await fetch('/api/user/ordercreate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: currentUser.email,

                        username: currentUser.username,
                        orderItems: cartItems,
                        shippingAddress: {
                            landmark: formData.landmark.trim(),
                            address: formData.address.trim(),
                            pincode: formData.pincode.trim(),
                            newMobile: formData.newMobile.trim(),
                            district: formData.district.trim()
                        },
                        totalPrice: totalPrice,

                    }),
                })

            }

            await fetch('/api/user/useraddress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: currentUser?.email, shippingAddress: {
                        landmark: formData.landmark.trim(),
                        address: formData.address.trim(),
                        pincode: formData.pincode.trim(),
                        newMobile: formData.newMobile.trim(),
                        district: formData.district.trim()
                    },
                }),
            });

            dispatch(addCartItems([]));

            dispatch(confirmOrderPlaced(true));
            navigate('/');




        } catch (error) {
            console.log("Error", error);

        }

    }


    const handleDefaultAddress = async (e) => {

        e.preventDefault();
        try {
            if (index === undefined) {
                alert("please select address");
                return;
            } else {


                if (monthlySub === true) {
                    await fetch("/api/user/monthlysub", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: currentUser?.email,
                            monthlySub: true,
                            shippingAddress: orderAddress[index],
                            totalPrice: totalPrice,
                        }),
                    })
                }
                else {
                    await fetch('/api/user/ordercreate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({

                            email: currentUser.email,
                            orderItems: cartItems,
                            shippingAddress: orderAddress[index],
                            totalPrice: totalPrice,
                        })

                    });
                }


                dispatch(addCartItems([]));
                navigate('/');
                dispatch(confirmOrderPlaced(true));
                


            }

        } catch (error) {
            console.log(error)

        }
    }


    useEffect(() => {

        const fetchOrderAddress = async () => {
            try {

                const res = await fetch('/api/user/getaddress', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: currentUser?.email }),
                })

                const userAddress = await res.json();
                setOrderAddress(userAddress);


            } catch (error) {
                console.log(error);
            }
        }

        fetchOrderAddress();



    }, [])


    return (
        <>
            {cartItems && cartItems.length > 0 || monthlySub === true ?
                (<main className=" p-3 mt-[10rem] max-w-4xl mx-auto">

                    <div className="w-full  flex flex-col gap-8 sm:gap-4 sm:flex-row items-center justify-between p-4  ">

                        <div className="flex  items-center ">
                            <Link to={"/"}>
                                <img src={Logo} alt="logo" className="w-[180px] object-cover " />

                            </Link>
                            <p className="w-full text-slate-800 text-2xl font-semibold ">Cash On Delivery</p>
                        </div>
                        <p
                            className="text-slate-800 text-2xl font-semibold p-1 px-2 "
                        // onClick={clearCartItem}

                        >
                            Food Delivery Address
                        </p>
                    </div>

                    {orderAddress && orderAddress.length > 0 && !flag ?
                        (

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4">
                                    <div className="w-full max-h-[700px] md:h-42 flex flex-col md:flex-row gap-3 overflow-y-scroll no-scrollbar">

                                        {orderAddress.map((item, index) => (
                                            <OrderAddress
                                                key={index}
                                                address={item}
                                                setIndex={setIndex}
                                                index={index}
                                                checkBox={checkBox} setCheckBox={setCheckBox}


                                            />
                                        ))}



                                    </div>
                                    <button
                                        className="w-full bg-orange-500 mb-4 text-slate-50 p-3 rounded-lg"
                                        onClick={handleDefaultAddress}

                                    >Order Proceed</button>

                                    <button
                                        className="w-full bg-slate-800 text-slate-50 p-3 rounded-lg"
                                        onClick={() => setflag(!flag)}

                                    >Add Address</button>
                                </div>


                            </div>) : (

                            <div className="">
                                {orderAddress && orderAddress.length > 0 && <button
                                    className="w-full bg-slate-800 text-slate-50 p-3 rounded-lg"
                                    onClick={() => setflag(!flag)}

                                >Selct Address</button>}


                                {/* Add Shipping Address */}

                                <form onSubmit={handleSubmit} className="flex flex-col my-[50px] gap-4 ">
                                    <div className="flex flex-col gap-4 flex-1">

                                        <p
                                            className="border font-semibold text-slate-500 p-3 rounded-lg"
                                        >{currentUser.username} / {currentUser.email}</p>

                                        <input
                                            type="text"
                                            placeholder="Landmark"
                                            className="border p-3 rounded-lg"
                                            id="landmark"
                                            maxLength={62}
                                            minLength={10}
                                            onChange={handleChange}
                                            value={formData.landmark}
                                            required
                                        />


                                        <textarea
                                            type="textarea"
                                            placeholder="Address"
                                            className="border p-3 rounded-lg"
                                            id="address"
                                            onChange={handleChange}
                                            value={formData.address}
                                            required
                                        />
                                        <div className='flex justify-between'>
                                            <input
                                                type="number"
                                                placeholder="pincode"
                                                className="border remove-arrow p-3 rounded-lg"
                                                id="pincode"
                                                onChange={handleChange}
                                                value={formData.pincode}
                                                required
                                            />


                                            <input
                                                type="number"
                                                placeholder="mobile"
                                                className="border remove-arrow p-3 rounded-lg"
                                                id="newMobile"
                                                onChange={handleChange}
                                                value={formData.newMobile}
                                                required
                                            />
                                            <select
                                                name="district" id="district"
                                                onChange={handleChange}
                                                className="w-[50%] border p-3 rounded-lg text-slate-600 font-semibold"
                                            >
                                                <option value="Patna">Patna</option>

                                            </select>
                                        </div>


                                    </div>

                                    {/* tempory button */}
                                    <button type="submit" className="p-3 bg-orange-500 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-90">Order Proceed</button>
                                </form>
                            </div>


                        )


                    }


                </main>

                ) : (<>
                    <div className="w-full flex flex-col items-center justify-center">
                        <img src={NotFound} className="h-340" />
                        <p className="text-xl text-headingColor font-semibold my-2">
                            Order Not Found
                        </p>
                    </div>
                </>)}
        </>
    );
}
