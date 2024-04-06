import React, { useEffect, useState } from 'react'
import PhoneInput from "react-phone-input-2";
import Flag from "../img/indflag.png"
import { useSelector, useDispatch } from "react-redux";
import { CgSpinner } from 'react-icons/cg';
import { RiCustomerService2Fill } from "react-icons/ri";





export default function HelpCenter() {

    const [loading, setLoading] = useState(false)
    const [ph, setPh] = useState('');
    const { currentUser } = useSelector(state => state.user)
    const dispatchEvent = useDispatch()


    const handleSendMessage = () => {
        const mobile = `+${ph}`
        const msg1 = `We are here to help you. Dear ${currentUser.username} Our team call you within 5 min`

        const msg2 = `Help center, Ask for help - user ${currentUser.username}, userMob: ${mobile}`

        sendMessage(mobile, msg1)

        sendMessage(import.meta.env.VITE_TWILIO_NUMBER, msg2)
    }


    const sendMessage = async (mobile, msg) => {


        try {
            setLoading(true);


            await fetch("/api/user/help", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mobile: mobile,
                    message: msg
                })
            })

            setTimeout(() => {

                setLoading(false);
            }, 2000);

        } catch (error) {
            console.log(error)

        }
    }




    return (
        <main className="w-full my-[8rem] mt-[12rem] flex flex-col items-center justify-center gap-8">
            <div className="">
                <p className=" text-blue-600 text-2xl flex gap-6 font-bold">Help Center
                    <RiCustomerService2Fill size={40} />
                </p>
            </div>
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
                        backgroundColor: "#ebeaea",
                        border: "none",
                    }}
                    value={ph}
                    onChange={setPh}
                />

                <img src={Flag} alt="flag" className='w-6 absolute z-10 h-6 bottom-3.5 left-4' />
            </div>

            <button className=" flex gap-1 items-center justify-center py-2.5 rounded bg-orange-500 hover:bg-orange-800 text-white px-4 "
                onClick={handleSendMessage}
            >

                {loading &&
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                }
                <span >Send code via SMS</span>
            </button>
        </main>
    )
}
