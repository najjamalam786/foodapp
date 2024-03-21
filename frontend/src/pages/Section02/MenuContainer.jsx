import React, { useEffect, useState } from 'react'
import { categories } from '../../utils/data';
import { IoFastFood } from "react-icons/io5";
import FoodContainer from '../../components/FoodContainer';
// import { useSelector } from 'react-redux';
export default function MenuContainer() {

    const [filter, setFilter] = useState("chicken");
    const [allFood, setAllFood] = useState([]);

    // const { cartItems } = useSelector((state) => state.item);
    
    useEffect(() => {
        const fetchAllFood = async () => {
            try {
                const response = await fetch('/api/item/get');
    
                const data = await response.json();
    
                setAllFood(data);

            } catch (error) {
                console.log(error)
                
            }
            
        }
        
        fetchAllFood();
    }, []);
    


    return (
        <section className="w-full my-6" id="menu">
            <div className="w-full flex flex-col items-center justify-center">
                <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
                    Our Hot Dishes
                </p>

                <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll no-scrollbar">
                    {categories &&
                        categories.map((category) => (
                            <div
                                
                                key={category.id}
                                className={`group ${filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
                                    } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                                onClick={() => setFilter(category.urlParamName)}
                            >
                                <div
                                    className={`w-10 h-10 rounded-full shadow-lg ${filter === category.urlParamName
                                            ? "bg-white"
                                            : "bg-cartNumBg"
                                        } group-hover:bg-white flex items-center justify-center`}
                                >
                                    <IoFastFood
                                        className={`${filter === category.urlParamName
                                                ? "text-textColor"
                                                : "text-white"
                                            } group-hover:text-textColor text-lg`}
                                    />
                                </div>
                                <p
                                    className={`text-sm ${filter === category.urlParamName
                                            ? "text-white"
                                            : "text-textColor"
                                        } group-hover:text-white`}
                                >
                                    {category.name}
                                </p>
                            </div>
                        ))}
                </div>

                <div className="w-full">
                    <FoodContainer
                        flag={false}
                        dataValue = {allFood.filter((item) => item.category === filter)}
                    />
                </div>
            </div>
        </section>
    );
};
