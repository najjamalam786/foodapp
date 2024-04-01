import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { addCartItems } from '../redux/createSlice/itemSlice';
import Logo from '../img/favicon.png';
import OrderAddress from '../components/OrderAddress';
import { confirmOrderPlaced, pageLoader } from '../redux/createSlice/orderSlice';


export default function ShippingAddress() {

    const { currentUser } = useSelector((state) => state.user);
    const { cartItems, totalPrice } = useSelector((state) => state.item);
    const [orderAddress, setOrderAddress] = useState();
  const [index, setIndex] = useState();
//   const [defaultaddress, setDefaultAddress] = useState();

    const [flag, setflag] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({

        landmark: "",
        address: "",
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

        dispatch(pageLoader(true));
        e.preventDefault();
        
        // order create api
        try {
            await fetch('/api/user/ordercreate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobile: currentUser.mobile,
                    name: currentUser.username,
                    email: currentUser.email,
                    orderItems: cartItems,
                    shippingAddress: {
                        landmark: formData.landmark.trim(),
                        address: formData.address.trim(),
                        pincode: formData.pincode.trim(),
                        district: formData.district.trim()
                    },
                    totalPrice: totalPrice,

                }),
            }).then(async() => {
                
                await fetch('/api/user/useraddress', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: currentUser?.email, shippingAddress: {
                        landmark: formData.landmark.trim(),
                        address: formData.address.trim(),
                        pincode: formData.pincode.trim(),
                        district: formData.district.trim()
                    },
                }),
                });

                dispatch(addCartItems([]));

                    setTimeout(() => {
                        dispatch(pageLoader(false));
                        dispatch(confirmOrderPlaced(true));
                        navigate('/');

                    },1000)
                    
                
            });

        } catch (error) {
            dispatch(pageLoader(false));
            console.log("Error", error);

        }

    }
    useEffect(() => {
        dispatch(pageLoader(true));
        
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

                    setTimeout(() => {
                        dispatch(pageLoader(false))
                    }, 800);
                
            } catch (error) {
                dispatch(pageLoader(false));
                console.log(error);
            }
        }

        fetchOrderAddress();

        setTimeout(() => {
            dispatch(pageLoader(false))
        }, 800);


    }, [])

    const handleDefaultAddress = async(e) => {
        dispatch(pageLoader(true));

        e.preventDefault();
        try {
            if(index === undefined){
                alert("please select address");
            }else{
                await fetch('/api/user/ordercreate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        mobile: currentUser.mobile,
                        orderItems: cartItems,
                        shippingAddress: orderAddress[index],
                        totalPrice: totalPrice,
    
                    })
                }).then(() => {

                    setTimeout(() => {
                        dispatch(addCartItems([]));
                        dispatch(pageLoader(false));
                        navigate('/');
                        dispatch(confirmOrderPlaced(true));
                    },1000)
                });
                
            }

        } catch (error) {
            dispatch(pageLoader(false));
            console.log(error)
            
        }
    }

    return (
        <>
            <main className=" p-3 max-w-4xl mx-auto">
                
                <div className="w-full  flex flex-col gap-4 sm:flex-row items-center justify-between p-4  ">

                    <div className="flex  items-center ">
                        <img src={Logo} alt="logo" className="w-14 h-14 " />
                        <p className="w-full text-slate-800 text-2xl font-semibold ">Cash On Delivery</p>
                    </div>
                    <p
                        className="text-slate-800 text-2xl font-semibold p-1 px-2 "
                    // onClick={clearCartItem}

                    >
                        Food Delivery Address
                    </p>
                </div>

                {orderAddress && orderAddress.length > 0 ?
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
                                            

                                        />
                                    ))}



                                </div>
                                <button
                                    className="w-full bg-green-500 mb-4 text-slate-50 p-3 rounded-lg"
                                    onClick={handleDefaultAddress}

                                >Order Confirm</button>
                            </div>

                            {flag ? (
                                // Add Shipping Address
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
                                                className="border p-3 rounded-lg"
                                                id="pincode"
                                                onChange={handleChange}
                                                value={formData.pincode}
                                                required
                                            />
                                            <select
                                                name="district" id="district"
                                                onChange={handleChange}
                                                className="w-[50%] border p-3 rounded-lg text-slate-600 font-semibold"
                                            >
                                                <option value="Patna">Patna</option>
                                                <option value="Bhagalpur">Bhagalpur</option>
                                                <option value="Madhepura">Madhepura</option>
                                                <option value="Gaya">Gaya</option>
                                                <option value="Muzaffarnagar">Muzaffarpur</option>
                                            </select>
                                        </div>


                                    </div>

                                    {/* tempory button */}
                                    <button type="submit" className="p-3 bg-green-500 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-90">Order Proceed</button>
                                </form>
                            ) :
                                (
                                    <button
                                        className="w-full bg-slate-800 text-slate-50 p-3 rounded-lg"
                                        onClick={() => setflag(true)}

                                    >Add Address</button>
                                )

                            }

                        </div>) : (

                        // Add Shipping Address
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
                                                className="border p-3 rounded-lg"
                                                id="pincode"
                                                onChange={handleChange}
                                                value={formData.pincode}
                                                required
                                            />
                                            <select
                                                name="district" id="district"
                                                onChange={handleChange}
                                                className="w-[50%] border p-3 rounded-lg text-slate-600 font-semibold"
                                            >
                                                <option value="Patna">Patna</option>
                                                <option value="Bhagalpur">Bhagalpur</option>
                                                <option value="Madhepura">Madhepura</option>
                                                <option value="Gaya">Gaya</option>
                                                <option value="Muzaffarnagar">Muzaffarpur</option>
                                            </select>
                                        </div>


                                    </div>

                                    {/* tempory button */}
                                    <button type="submit" className="p-3 bg-green-500 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-90">Order Proceed</button>
                                </form>
                    )


                }


            </main>
        </>
    );
}
