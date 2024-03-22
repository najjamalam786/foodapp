import React, { useState } from "react";
// import { motion } from "framer-motion";

import {
    MdFastfood,
    MdCloudUpload,
    MdDelete,
    MdFoodBank,
    
} from "react-icons/md";
import { PiPlusMinusFill } from "react-icons/pi";
import { FaRupeeSign } from "react-icons/fa";
import { categories } from "../utils/data";
import Loader from "../components/Loader";
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.config.js";
// import { getAllFoodItems, saveItem } from "../utils/firebaseFunctions";
// import { actionType } from "../context/reducer";
// import { useStateValue } from "../context/StateProvider";

const UploadFood = () => {
    //   const [name, setName] = useState("");
    //   const [calories, setCalories] = useState("");
    //   const [price, setPrice] = useState("");
    //   const [category, setCategory] = useState(null);
    // const [imageAsset, setImageAsset] = useState(null);
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState("Faild");
    const [msg, setMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [foodData, setFoodData] = useState({
        name: "",
        imageURL: "",
        category: "",
        calories: "",
        pieces: "",
        quantity: 1,
        price: "",
    })
    //   const [{ foodItems }, dispatch] = useStateValue();
    

    const uploadImage = (e) => {
        setIsLoading(true);
        const imagefile = e.target.files[0];
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imagefile.name;

        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, imagefile);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.log(error);
                setFields(true);
                setMsg("Error while uploading : Try Again!");
                setAlertStatus("Faild");
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 4000);
                
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFoodData({ ...foodData, imageURL: downloadURL });

                    setIsLoading(false);
                    setFields(true);
                    setMsg("Image uploaded successfully!");
                    setAlertStatus("Success");
                    setTimeout(() => {
                        setFields(false);
                    }, 4000);

                });
            });

    };

    const deleteImage = () => {
        setIsLoading(true);
        const storage = getStorage(app)
        const deleteRef = ref(storage, foodData.imageURL);
        deleteObject(deleteRef).then(() => {
            setFoodData({ ...foodData, imageURL: "" });
            setIsLoading(false);
            setFields(true);
            setMsg("Image deleted successfully!");
            setAlertStatus("success");
            setTimeout(() => {
                setFields(false);
            }, 4000);
        });
    };



        const handleSubmit = async (e) => {
            e.preventDefault();
            
            try{
                
                
            setIsLoading(true);
            const response = await fetch("/api/item/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(foodData),
            });

            const data = await response.json();
            
            


            setIsLoading(false);
            setFields(true);

            if(data.success === false){
                
                return (
                    setAlertStatus("Faild"),
                    setMsg(data.message)
                    
                )
                
            }

            setMsg("Data Uploaded successfully!");
            setAlertStatus("Success");
            setTimeout(() => {
            //   setFields(false);
              window.location.reload();
            }, 3000);


            // clearData();
          
        } catch (error) {
          console.log(error);
          setFields(true);
          setMsg("Error while uploading : Try Again!");
          setAlertStatus("Faild");
          setTimeout(() => {
            setFields(false);
            setIsLoading(false);
          }, 4000);
        }

        // fetchData();
      };

    //     const clearData = () => {
    //     setFoodData({
    //       name: "",
    //       imageURL: "",
    //       category: "",
    //       calories: "",
    //       pieces: "",
    //       quantity: "",
    //       price: "",
    //     })
        
    //   };

    //   const fetchData = async () => {
    //     await getAllFoodItems().then((data) => {
    //       dispatch({
    //         type: actionType.SET_FOOD_ITEMS,
    //         foodItems: data,
    //       });
    //     });
    //   };
      
      const handleChange = (e) => {
          
          if(e.target.type === 'text'){
              const value = e.target.value;
              setFoodData({ ...foodData, [e.target.name]: value });
            }
            if(e.target.name === 'category'){
                const value = e.target.value;
                setFoodData({ ...foodData, [e.target.name]: value });
            }
            
            if(e.target.type === 'number'){
                const value = e.target.value;
                setFoodData({ ...foodData, [e.target.name]: value });
            }
        };
        
        
    return (
        <form onSubmit={handleSubmit} className="w-full min-h-screen flex items-center justify-center">
            <div className="w-[90%] md:w-[80%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
                {fields && (<p
                    className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === "Faild" ? "bg-red-400 text-red-800" : "bg-emerald-400 text-emerald-800"
                }`}


                >
                    {msg}
                </p>

                )}


                <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdFastfood className="text-xl text-gray-700" />
                    <input
                        type="text"
                        name="name"
                        required
                        value={foodData.name}
                        onChange={handleChange}
                        placeholder="Give me a title name..."
                        className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                    />
                </div>
                

                <div className="w-full">
                    <select
                        
                        name="category"
                        value={foodData.category}
                        onChange={handleChange}
                        className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                    >
                        <option value="other" className="bg-white">
                            Select Category
                        </option>

                        {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}

                    </select>
                </div>

                <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">

                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            {!foodData.imageURL ? (
                                <>
                                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                            <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                                            <p className="text-gray-500 hover:text-gray-700">
                                                Click here to upload
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            name="uploadimage"
                                            accept="image/*"
                                            onChange={uploadImage}
                                            className="w-0 h-0"
                                        />
                                    </label>
                                </>
                            ) : (
                                <>
                                    <div className="relative h-full">
                                        <img
                                            src={foodData.imageURL}
                                            name="imageURL"
                                            alt="uploaded image"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                                            onClick={deleteImage}
                                        >
                                            <MdDelete className="text-white" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>

                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <MdFoodBank className="text-gray-700 text-3xl" />
                        <input
                            type="number"
                            required
                            name="calories"
                            value={foodData.calories}
                            onChange={handleChange}
                            placeholder="Calories"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                        />
                    </div>

                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <FaRupeeSign className="text-gray-700 text-xl" />
                        <input
                            type="number"
                            min={10}
                            
                            required
                            name="price"
                            value={foodData.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                        />
                    </div>
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <PiPlusMinusFill className="text-gray-700 text-3xl" />
                        <p className="text-gray-400 font-semibold">Qty.</p>
                        <input
                        
                            type="number"
                            min={2}
                            name="pieces"
                            value={foodData.pieces}
                            onChange={handleChange}
                            placeholder="pieces"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 "
                        />
                    </div>
                </div>

                <div className="flex items-center w-full">
                    <button
                        type="submit"
                        className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
                        
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default UploadFood;
