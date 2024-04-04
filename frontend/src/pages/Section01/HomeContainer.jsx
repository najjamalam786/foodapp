import React, { useEffect, useState } from 'react'
import Delivery from '../../img/delivery.png';
import Lemon from "../../img/lemon.png";
import Pngwing1 from "../../img/pngwing1.png";
import HomeFront from "../../img/homeFront.png";
import Pngwing3 from "../../img/pngwing3.png";
import MonthImg from "../../img/monthlySub.png";
import HomeBg from "../../img/home.png"
import { heroData } from '../../utils/data';
import { useDispatch } from 'react-redux';
import { monthlySubscription } from '../../redux/createSlice/orderSlice';
import { Link } from 'react-router-dom';
import { addTotalPrice, monthlySubscriptionItem } from '../../redux/createSlice/itemSlice';

// import CartContainer from '../../components/CartContainer';


export default function HomeContainer() {

    // const [hero, setHero] = useState({
    //     name: "Monthly Subscription",
    //     imageURL:'https://firebasestorage.googleapis.com/v0/b/fooddeliveryapp-4818c.appspot.com/o/monthlySub.png?alt=media&token=e1612426-1091-4620-9d4d-b1f521ecf92e',
    //     quantity: 1,
    //     price: 4499,
        
    // });

    const dispatch = useDispatch();

    const handleCheck = () => {
        dispatch(monthlySubscription(true))
        dispatch(addTotalPrice(4499));

    }
    
    useEffect(() => {
        dispatch(monthlySubscription(false))


    }, [])
    
  return (
    <section className='w-full relative '>
        <div className=" absolute z-[-1]">
            <img src={HomeBg} alt="home-bg"  className="w-screen h-full object-cover" />
        </div>

        <div className="w-[10%] absolute top-[-1.5%] left-[20%] sm:top-[-5%]  z-[-1] rotate-[40deg]">
            <img src={Lemon} alt="img" className="" />
        </div>
        <div className="w-[30%] absolute top-[60%] left-[20%]   z-[-1] ">
            <img src={Pngwing1} alt="img" className="" />
        </div>
        <div className="w-[10%] absolute top-[20%] left-[-4%]   z-[-1] ">
            <img src={Pngwing3} alt="img" className="" />
        </div>


        <div className="px-8 lg:px-16 py-16 lg:py-10 mt-[3rem] lg:mt-[6rem]  flex flex-col md:flex-row">

        <div className='flex-1 flex flex-col items-start justify-center  gap-6'>
            <div className=" flex items-center gap-2 justify-center bg-orange-500 px-4 py-1
             rounded-full">
                <p className='text-base text-white font-semibold'>
                    Fast Delivery
                </p>
                <div className='w-10 h-10 bg-white rounded-full overflow-hidden'>
                    <img src={Delivery} className='w-full h-full object-contain' alt="bike img" />
                </div>
            </div>
            <p className="text-[30px] lg:text-[40px] font-bold tracking-wide text-headingColor mt-4">
                <span className='text-orange-600'> TIFFINBOX </span> Delivery in <span className='text-orange-600 text-[40px] lg:text-[50px]'> Your City </span>
            </p>
            <p className="text-[20px] lg:text-[30px] font-bold tracking-wide text-headingColor mt-4">
            <span className='text-orange-600'> FOOD </span> From Home Kitchen To <span className='text-orange-600 '> Your Place </span>
            </p>

            <p className="text-textColor text-lg lg:text-xl my-2 ">Healty and Tasty food from our home kitchen to your place. We ensure that the food is hygienic and delicious. Our vision is to provide you with the best food in town and make you feel at home. I promise that you will be satisfied with our food. Test our food now.
            </p> 
            <p className="text-textColor text-lg lg:text-xl font-semibold mt-2 ">For monthly subscription...
            </p> 


            <Link to="/order-create">
            <button className='bg-gradient-to-br from-orange-400 to-orange-500 text-white font-semibold w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out'
            onClick={ handleCheck }>
                Order For Monthly 
            </button>

            </Link>
        </div>
        <div className="p-2 flex-1 flex items-center relative  ">
            <div className="w-full item-center justify-center relative">
                <img src={HomeFront} alt="hero-bg" className="ml-auto h-650 w-auto lg:h-650" />

                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32  py-4 gap-4 flex-wrap">
                    {heroData && heroData.map((n) => (
                        <div key={n.id} className=" w-[10rem]  lg:w-[12rem]  bg-cardOverlay backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center drop-shadow-lg">
                            <img src={n.imageSrc} alt="I1" className="w-[8rem] lg:w-[10rem] mt-[-10%] lg:mt-[-20%] " />
                            <p className="text-base font-semibold text-textColor mt-2 lg:mt-4">{n.name}</p>

                            <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">{n.decp}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        </div>
        
        {/* <CartContainer/> */}

    </section>
  )
}
