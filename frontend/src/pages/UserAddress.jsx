import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../img/NotFound.svg";

import Address from '../components/Address';



export default function UserAddress() {


    const [orderAddress, setOrderAddress] = useState([]);
    const { currentUser } = useSelector((state) => state.user)

    const dispatch = useDispatch();

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
        <div className='w-full mt-[10rem] flex flex-col gap-8 p-8 '>

            <div className="flex  items-center justify-center">

                <p
                    className="text-slate-800 text-2xl font-semibold p-1 px-2 "
                // onClick={clearCartItem}

                >
                    Your Address
                </p>
            </div>
            <div className="flex flex-col gap-4">

                {orderAddress && orderAddress.length > 0 ?
                    (<div className="flex flex-col gap-4">
                        <div className="w-full max-h-[700px] md:h-42 flex flex-col md:flex-row gap-3 overflow-y-scroll no-scrollbar">

                            {orderAddress.map((item, index) => (
                                <Address
                                    key={index}
                                    address={item}
                                />
                            ))}



                        </div>

                    </div>
                    ) : (

                        <div className="w-full flex flex-col items-center justify-center">
                            <img src={NotFound} className="h-340" />
                            <p className="text-xl text-headingColor font-semibold my-2">
                                Address Not Found
                            </p>
                        </div>
                    )


                }
            </div>

        </div>


    )
}
