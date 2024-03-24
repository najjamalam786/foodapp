import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { addCartItems } from '../redux/createSlice/itemSlice';
import Logo from '../img/favicon.png';


export default function ShippingAddress() {

  const { currentUser } = useSelector((state) => state.user);
  const { cartItems, totalPrice } = useSelector((state) => state.item);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    
    landmark: "",
    address:"",
    pincode:"",
    district:"Patna",
    
  })

  const handleChange = (e) => {
    if(e.target.id === "district") {
      const district = e.target.value;
      setFormData({
        ...formData,
        district
      })
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      })
    }
    
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        await fetch('/api/user/ordercreate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: currentUser.username,
                email: currentUser.email,
                orderItems: cartItems,
                shippingAddress: formData,
                totalPrice: totalPrice,

            }),
        }).then((response) => response.json()).then(() => {
            dispatch(addCartItems([]));

        });
        
      
    
            navigate('/');
    //   navigate('/payment');

    } catch (error) {
      console.log("Error", error);
      
    }

  }

  return (
    <>
        <main className=" p-3 max-w-4xl mx-auto">
        <div className="w-full  flex items-center justify-between p-4  ">

<img src={Logo} alt="logo" className="w-14 h-14" />
<p
className="text-slate-800 text-2xl font-semibold p-1 px-2 "
// onClick={clearCartItem}

>
Food Delivery Address
</p>
</div>

            <form onSubmit={handleSubmit}  className="flex flex-col my-[50px] sm:flex-row gap-4 ">
                <div className="flex flex-col gap-4 flex-1">

                    <p
                        className="border font-semibold text-slate-500 p-3 rounded-lg"
                    >{currentUser.username} / {currentUser.email}</p>

                    <input
                        type="text"
                        placeholder="Landmark"
                        className="border p-3 rounded-lg"
                        id="landmark"
                        maxLength={62}
                        minLength={10}
                        onChange={handleChange}
                        value={formData.landmark}
                        required
                    />
                    
                    
                    <textarea
                        type="textarea"
                        placeholder="Address"
                        className="border p-3 rounded-lg"
                        id="address"
                        onChange={handleChange}
                        value={formData.address}
                        required
                    />
            <div className='flex justify-between'>
              <input
                type="number"
                placeholder="pincode"
                className="border p-3 rounded-lg"
                id="pincode"
                onChange={handleChange}
                value={formData.pincode}
                required
              />
              <select
                name="district" id="district"
                onChange={handleChange}
                className="w-[50%] border p-3 rounded-lg text-slate-600 font-semibold"
              >
                <option value="Patna">Patna</option>
                <option value="Bhagalpur">Bhagalpur</option>
                <option value="Madhepura">Madhepura</option>
                <option value="Gaya">Gaya</option>
                <option value="Muzaffarnagar">Muzaffarpur</option>
              </select> 
            </div>

                    {/* <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2">
                            <input type="checkbox" id="sale" className="w-5"
                                onChange={handleChange}
                                checked={formData.type === 'sale'} />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="rent" className="w-5"
                                onChange={handleChange}
                                checked={formData.type === 'rent'} />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="parking" className="w-5"
                                onChange={handleChange}
                                checked={formData.parking} />
                            <span>Parking spot</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="furnished" className="w-5"
                                onChange={handleChange}
                                checked={formData.furnished} />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="offer" className="w-5"
                                onChange={handleChange}
                                checked={formData.offer} />
                            <span>Offer</span>
                        </div>
                    </div> */}

                    {/* <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                id="bedrooms"
                                min="1"
                                max="10"
                                onChange={handleChange}
                                value={formData.bedrooms}
                                required
                                className="p-3 border-gray-300 rounded-lg"
                            />
                            <p>Beds</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                id="bathrooms"
                                min="1"
                                max="10"
                                onChange={handleChange}
                                value={formData.bathrooms}
                                required
                                className="p-3 border-gray-300 rounded-lg"
                            />
                            <p>Baths</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                id="regularPrice"
                                min="0"
                                required
                                className="p-3 border-gray-300 rounded-lg"
                                onChange={handleChange}
                                value={formData.regularPrice}
                            />
                            <div className="flex flex-col items-center">
                                <p>Regular Price</p>
                                <span className="text-xs">
                                    {formData.type === 'rent' ? "{ $/month }" : "{ $amount }"}

                                </span>
                            </div>
                        </div>
                        {formData.offer && <div className="flex items-center gap-2">
                            <input
                                type="number"
                                id="discountPrice"
                                min="0"
                                required
                                className="p-3 border-gray-300 rounded-lg"
                                onChange={handleChange}
                                value={formData.discountPrice}
                            />
                            <div className="flex flex-col items-center">
                                <p>Discount Price</p>
                                <span className="text-xs">($ / month)</span>
                            </div>
                        </div>}
                    </div> */}
                </div>
                {/* <div className="flex flex-col flex-1 gap-4">
                    <p className="font-semibold">
                        Images:
                        <span className="font-normal text-gray-600 ml-2">
                            The first image will be the cover (max 6 and less than 3MB)
                        </span>
                    </p>
                    <div className="flex gap-4">
                        <input
                            // onChange={(e) => setFiles(e.target.files)}
                            type="file"
                            className="p-3 border border-gray-300 rounded w-full"
                            id="images"
                            accept="image/+"
                            multiple
                        />

                        <button
                            disabled={uploading}
                            type="button"
                            onClick={handleImageSubmit}
                            className="p-3 text-green-700 border border-green-700 rounded uupercase hover:shadow-lg disabled:opacity-80"
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>

                    {uploading && <p className="text-green-700 text-sm">{`Upload is ${filePercent}% done`}</p>}

                    <p className="text-red-700 text-sm">
                        {imageUploadError && imageUploadError}
                    </p>
                    {formData.imageUrls.length > 0 &&
                        formData.imageUrls.map((url, index) => (
                            <div
                                key={url}
                                className="flex justify-between p-3 border items-center"
                            >
                                <img
                                    src={url}
                                    alt="listing image"
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="text-red-700 text-sm font-semibold uppercase p-3 hover:opacity-55"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}

                    

                    <button
                        type="submit"
                        // protect un-necessary click use "disable={loading || uploading}"
                        disabled={loading || uploading}
                        className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-90"
                    >
                        {loading ? 'Creating...' : 'Create List'}
                    </button>

                    {error && <p className="text-red-700 text-sm">{error}</p>}
                </div> */}

                {/* tempory button */}
                <button type="submit" className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-90">Button Order Proceed</button>
            </form>
        </main>
    </>
);
}
