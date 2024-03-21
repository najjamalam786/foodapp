import React from 'react'
import Delivery from '../../img/delivery.png';
import HeroBg from "../../img/heroBg.png";
import { heroData } from '../../utils/data';
// import CartContainer from '../../components/CartContainer';


export default function HomeContainer() {

    
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        <div className='py-2 flex-1 flex flex-col items-start justify-center gap-6'>
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
        <div className="p-2 flex-1 flex items-center relative">
            <div className="w-full item-center justify-center relative">
                <img src={HeroBg} alt="hero-bg" className="ml-auto h-420 w-full lg:w-auto lg:h-650" />

                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32  py-4 gap-4 flex-wrap">
                    {heroData && heroData.map((n) => (
                        <div key={n.id} className="lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg">
                            <img src={n.imageSrc} alt="I1" className="w-20 lg:w-40 -mt-10 lg:-mt-20 " />
                            <p className="text-base font-semibold text-textColor mt-2 lg:mt-4">{n.name}</p>

                            <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">{n.decp}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        {/* <CartContainer/> */}

    </section>
  )
}
