import { useEffect, useState } from 'react';
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OTPInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CgSpinner } from "react-icons/cg";
import Flag from "../img/indflag.png"
import Success from "../img/tick.png"
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { IoCloseCircleOutline, IoLogInOutline } from 'react-icons/io5';
import { signInSuccess, userMobileAuth } from '../redux/createSlice/userSlice';
import { pageLoader } from '../redux/createSlice/orderSlice';

export default function MobileAuthentication() {

    const { email } = useSelector((state) => state.user);
    const [codeVerify, setCodeVerify] = useState('');
    const [ph, setPh] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [user, setUser] = useState(false)

    const dispatchEvent = useDispatch();
    const navigate = useNavigate();
    // const [codeID, setCodeID] = useState('');

    const handleSendCode = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            dispatchEvent(pageLoader(true));
            
            
            await fetch("/api/user/verify-mobile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    mobile:`+${ph}`,
                })
            }).then((res) => res.json()).then(async (data) => {

                if(data === null) {
                    setLoading(false);
                    dispatchEvent(pageLoader(false));

                    alert("User already verified. Please try again!");
                    return;
                }
                else{

                    const code = data._id.slice(-4);
                    const mobile = `+${ph}`
                    
                    
                    // console.log("code", codeID);
                    // console.log("mobile", mobile);
                    await fetch("/api/user/message", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email,
                            codeID: code,
                            mobile: mobile,
                            message: `( TIFFINBOX ) Your verification code is: ${code}`
                        })
                    })
    
                    dispatchEvent(pageLoader(true));
                    setTimeout(() => {
                        console.log("mobile", mobile);
                    console.log("code", code);

                        setLoading(false);
                        setShowCode(true);
                        dispatchEvent(pageLoader(false));
                    }, 2000);
                }
            });
                
            // dispatchEvent(pageLoader(false));
            // setLoading(false);

            // const codeID = await response.json();
        } catch (error) {
            alert(error.message)

        }
    }

    const handleVerifyCode = async (e) => {
        e.preventDefault();

            setLoading(true);
            const codeV = `${codeVerify}`
            const response = await fetch("/api/user/verify-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mobile: `+${ph}`,
                    code: codeV

                })
            });
            const data = await response.json();


            if (data && data.userAuth) {
                dispatchEvent(pageLoader(true));
                dispatchEvent(signInSuccess(data));

                setTimeout(() => {
                    dispatchEvent(pageLoader(false));
                    setUser(true);
                    setLoading(false);
                    navigate("/");
                    
                }, 2000);
            } else {
                setUser(false);

                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    alert("Invalid code! Please try again");
            }, 4000);

            }
        

    }

    useEffect(() => {
        // const fetchUserEmail = async() => {
        // }
    }, [])
    return (
        <section className='  w-full h-full rounded-lg bg-emerald-500 flex items-center justify-center '>
            <div className=" absolute w-full flex items-center gap-4 bg-yellow-400 top-0 left-0 py-2 px-4 rounded-lg">
                <p className="text-xl leading-normal text-white">Login </p>
                <IoLogInOutline size={25}/>
                
                <IoCloseCircleOutline size={25} onClick={() => dispatchEvent(userMobileAuth(false))} className='absolute top-2 right-4 cursor-pointer' />
            </div>

            <div className="">
                {user ? (
                    <div className="w-80 flex flex-col items-center justify-center gap-4 rounded-lg p-4">
                        <img src={Success} alt="success" className="w-40 h-40" />
                        <h2 className='text-4xl text-center leading-normal font-medium text-white'>Login Successfully</h2>
                    </div>
                )
                    :
                    (
                        <div className="w-80 flex flex-col items-center justify-center gap-4 rounded-lg p-4">
                            <h1 className='text-4xl text-center leading-normal font-medium text-white'>Mobile Authentication</h1>

                            {showCode ?

                                <>
                                    <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                                        <BsFillShieldLockFill size={30} />

                                    </div>
                                    <label
                                        htmlFor="code"
                                        className="font-bold text-2xl text-center text-white"
                                    >Enter Your Code</label>
                                    <OTPInput
                                        OTPLength={4}
                                        otpType="string"
                                        disabled={false}
                                        autoFocus
                                        className="otp-container"
                                        value={codeVerify}
                                        onChange={setCodeVerify}
                                    ></OTPInput>

                                    <button className="w-full flex gap-1 items-center justify-center py-2.5 rounded bg-emerald-600 hover:bg-emerald-800 text-white px-4 "
                                        onClick={handleVerifyCode}
                                    >

                                        {loading &&
                                            <CgSpinner size={20} className="mt-1 animate-spin" />
                                        }
                                        <span className="">Verify Code</span>
                                    </button>




                                </>
                                :
                                <>
                                    <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                                        <BsTelephoneFill size={30} />

                                    </div>
                                    <label
                                        htmlFor=""
                                        className="font-bold text-xl text-center text-white"
                                    >
                                        Verify your mobile number

                                    </label>

                                    <div className="relative">
                                        <PhoneInput
                                            country={'in'}
                                            countryCodeEditable={false}
                                            inputStyle={{
                                                paddingTop: 26,
                                                paddingRight: 16,
                                                paddingBottom: 26,
                                                paddingLeft: 58,
                                                width: "100%",
                                                fontSize: 18,
                                                zIndex: 1,
                                                backgroundColor: "#F3F6F9",
                                                border: "none",
                                            }}
                                            value={ph}
                                            onChange={setPh} />

                                        <img src={Flag} alt="flag" className='w-6 absolute z-10 h-6 bottom-3.5 left-4' />
                                    </div>


                                    <button className="w-full flex gap-1 items-center justify-center py-2.5 rounded bg-emerald-600 hover:bg-emerald-800 text-white px-4 "
                                        onClick={handleSendCode}
                                    >

                                        {loading &&
                                            <CgSpinner size={20} className="mt-1 animate-spin" />
                                        }
                                        <span >Send code via SMS</span>
                                    </button>




                                </>
                            }


                        </div>

                    )

                }
            </div>
        </section>
    )
}
