import { useEffect, useState } from 'react';
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OTPInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CgSpinner } from "react-icons/cg";
import Flag from "../img/indflag.png"
import { useNavigate } from 'react-router-dom';

export default function MobileAuthentication({ codeID, userEmail }) {


    const [codeVerify, setCodeVerify] = useState('');
    const [ph, setPh] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [user, setUser] = useState(false)

    const navigate = useNavigate();
    // const [codeID, setCodeID] = useState('');

    const handleSendCode = async(e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setShowCode(true);
            setLoading(false);

            await fetch("/api/user/verify-phone", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userEmail,
                    phone: ph,
                    codeID: codeID
                })
            }).then((res) => res.json()).then(async() => {

                // const code = codeID.slice(0, 4);
                const phone = `+${ph}`
                
                // console.log("code", codeID);
                // console.log("mobile", phone);
                    await fetch("/api/user/message", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            mobile: phone,
                            message: `( TIFFINBOX ) Your verification code is: ${codeID}`
                        })
                    })
            });

            // const codeID = await response.json();
        } catch (error) {
            alert(error.message)

        }
    }

    const handleVerifyCode = async(e) => {
        e.preventDefault();
        setLoading(true);
        const codeV = `${codeVerify}`
        const response = await fetch("/api/user/verify-code",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: codeV
            })
        });
        const data = await response.json();
        if(data) {
            setUser(true);
            navigate("/signin");
        }else{
            alert(data.message)
            setUser(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        // const fetchUserEmail = async() => {
        // }
    }, [])
  return (
    <section className='w-full rounded-lg bg-emerald-500 flex items-center justify-center h-screen'>
        <div className="">
            {user ? (
                <h2 className='text-4xl text-center leading-normal font-medium text-white'>Login Successfully</h2>
            )
            :
            (
            <div className="w-80 flex flex-col items-center justify-center gap-4 rounded-lg p-4">
                <h1 className='text-4xl text-center leading-normal font-medium text-white'>Mobile Authentication</h1>

                { showCode ?

                    <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                    <BsFillShieldLockFill size={30} />

                </div>
                <label
                    htmlFor="code"
                    className="font-bold text-2xl text-center text-white"                                 
                    >Enter Your OTP</label>
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
                        Verify your phone number
                    
                    </label>

                    <div className="relative">
                    <PhoneInput 
                    country={'in'} 
                    countryCodeEditable={false}
                    inputStyle={{
                        paddingTop: 26,
                        paddingRight:16,
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
