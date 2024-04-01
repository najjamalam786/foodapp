import React from 'react'
import Delivery from '../../img/delivery.png';
import Lemon from "../../img/lemon.png";
import Pngwing1 from "../../img/pngwing1.png";
import HomeFront from "../../img/homeFront.png";
import Pngwing3 from "../../img/pngwing3.png";
import HomeBg from "../../img/home.png"
import { heroData } from '../../utils/data';
// import CartContainer from '../../components/CartContainer';


export default function HomeContainer() {

    
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
                    Bike Delivery
                </p>
                <div className='w-10 h-10 bg-white rounded-full overflow-hidden'>
                    <img src={Delivery} className='w-full h-full object-contain' alt="bike img" />
                </div>
            </div>
            <p className="text-[30px] lg:text-[40px] font-bold tracking-wide text-headingColor mt-4">
                The Fastest Delivery in <span className='text-orange-600 text-[40px] lg:text-[50px]'> Your City </span>
            </p>

            <p className="text-textColor text-lg lg:text-xl font-semibold my-2 ">Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p> 

            <button className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out'>
                Order Now
            </button>
        </div>
        <div className="p-2 flex-1 flex items-center relative  ">
            <div className="w-full item-center justify-center relative">
                <img src={HomeFront} alt="hero-bg" className="ml-auto h-650 w-auto lg:h-650" />

                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32  py-4 gap-4 flex-wrap">
                    {heroData && heroData.map((n) => (
                        <div key={n.id} className=" lg:w-[20rem]  bg-cardOverlay backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center drop-shadow-lg">
                            <img src={n.imageSrc} alt="I1" className="w-[20rem] lg:w-[40rem] mt-[-10rem] lg:mt-[-10rem] " />
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
