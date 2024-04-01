import { useEffect, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/createSlice/userSlice';
import GoogleAuth from '../components/GoogleAuth';
import { pageLoader } from '../redux/createSlice/orderSlice';

export default function Login() {

  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const {loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    });
    // console.log(formData);
  }

  const handleSubmit = async(e) => {
    dispatch(pageLoader(true));
    e.preventDefault();

    try{
        // setLoading(true);
        dispatch(signInStart())
      
      const res = await fetch('/api/user/signin', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mobile:`+91${formData.phone}`,
          password:formData.password
        }),
      });

      const data = await res.json();

      

      e.target.reset();
      
      if(data.success === false) {
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message));
        dispatch(pageLoader(false));
        return;
      }
      // setLoading(false);
      // setError(null);
      setTimeout(() => {
        dispatch(signInSuccess(data));
        navigate('/');
        dispatch(pageLoader(false));
      }, 1000);
      

    }catch(error){
      // setError(error.message);
      // setLoading(false)
      dispatch(pageLoader(false));

      dispatch(signInFailure(error.message));
    }
  }

  useEffect(() => {
    dispatch(pageLoader(true));
    setTimeout(() => {
      dispatch(pageLoader(false));
    }, 500);
  },[])

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7' >
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

      {/* <div className="relative">
          <span className='absolute top-3 left-3'>+91</span>
        <input type="number" placeholder='Enter your number' className='w-full outline-none remove-arrow border p-3 pl-14 rounded-lg' id="number" onChange={handleChange}/>
        </div> */}

        <div className="relative w-full">
          <span className='absolute w-14 top-3 left-3 border-r-2 border-gray-400 pl-4'>+91</span>
        <input type="number" placeholder='phone' className='w-full remove-arrow border p-3 pl-20 outline-none  rounded-lg' id="phone" onChange={handleChange} required/>
        </div>


        <input type="password" placeholder='password' className='border p-3 rounded-lg' id="password" onChange={handleChange} required/>

        <button disabled={loading} type='submit' className='bg-blue-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-95'>{loading ? "Loaging..." : "Sign In"}</button>

        <GoogleAuth/>

      </form>
      <div className='flex flex-col gap-4 mt-8'>
        <p>Don't have any account?</p>
        <Link to='/signup'>
          <p className='bg-violet-600 text-white text-center p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-95'
          
          >
            Create Account

          </p>
        </Link>
      </div>
      {error && <p className='text-red-700'>{error}</p>}
    </div>
  )
}
