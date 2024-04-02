import React, { useEffect, useState } from 'react'
import { IoFastFood } from "react-icons/io5";
import FoodContainer from '../../components/FoodContainer';
// import { useSelector } from 'react-redux';
export default function MenuContainer() {

    const [filter1, setFilter1] = useState("sunday");
    // const [filter2, setFilter2] = useState("week 1");
    const [allFood, setAllFood] = useState([]);
    const [weeks, setWeeks] = useState([]);

    // const { cartItems } = useSelector((state) => state.item);
    useEffect(() => {

        const fetchWeeks = async () => {
            try {
                const response = await fetch('/api/item/week');
                const data = await response.json();
                setWeeks(data);

            } catch (error) {
                console.log(error)
                
            }
        }
        const fetchAllFood = async () => {
            try {
                const response = await fetch('/api/item/get');
    
                const data = await response.json();
                // console.log("data", data);
                setAllFood(data);

            } catch (error) {
                console.log(error)
                
            }
            
        }
        fetchWeeks();
        fetchAllFood();
    }, []);
    


    return (
        <section className="px-8 lg:px-16 mt-10 lg:mt-40  w-full my-6" id="menu">
            {weeks && weeks.map((week) => (
            <div key={week._id} className="w-full flex flex-col gap-2 items-center justify-center">
                <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 hover:before:w-32 transition-all ease-in-out before:duration-300 mr-auto">
                    Our Hot Dishes {`Week ${week.index}`}
                </p>
                

                <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll no-scrollbar">
                    
                            
                            {
                           week && week.week.map((item) => (

                            <div
                                
                                key={item._id}
                                className={`group ${filter1 === item.urlParamName ? "bg-cartNumBg" : "bg-card"
                                    } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                                onClick={() => setFilter1(item.urlParamName)}
                            >
                                <div
                                    className={`w-10 h-10 rounded-full shadow-lg ${filter1 === item.urlParamName
                                            ? "bg-white"
                                            : "bg-cartNumBg"
                                        } group-hover:bg-white flex items-center justify-center`}
                                >
                                    <IoFastFood
                                        className={`${filter1 === item.urlParamName
                                                ? "text-textColor"
                                                : "text-white"
                                            } group-hover:text-textColor text-lg`}
                                    />
                                </div>
                                <p
                                    className={`text-sm ${filter1 === item.urlParamName
                                            ? "text-white"
                                            : "text-textColor"
                                        } group-hover:text-white`}
                                >
                                    {item.name}
                                </p>
                            </div>
                            ))
                        }
                        
                </div>

                <div className="w-full">
                    <FoodContainer
                        flag={false}
                        dataValue = {allFood.filter((item) => (item.day === filter1 && item.week ===   `week ${week.index}`))}
                    />
                </div>

            </div>
            ))}
        </section>
    );
};
