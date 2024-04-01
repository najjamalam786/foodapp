import { useState } from 'react'
import {Link } from 'react-router-dom';
import GoogleAuth from '../components/GoogleAuth';
import { useDispatch } from 'react-redux';
import { pageLoader } from '../redux/createSlice/orderSlice';
import { userEmail, userMobileAuth } from '../redux/createSlice/userSlice';
export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [mobileAuth, setMobileAuth] = useState(false);
  // const [codeID, setCodeID] = useState('');

  // console.log(formData.email);
  const dispatchEvent = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    });
    // console.log(formData);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      dispatchEvent(pageLoader(true))
      setLoading(true);
      
      
      const res = await fetch('/api/user/sign-up', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();

        if(data === null) {
          setLoading(false);
          dispatchEvent(pageLoader(false))
          setError(true);
          return;
        }
        else{
          dispatchEvent(userEmail(data.email));
          dispatchEvent(userMobileAuth(true));
        }

        
      
      
      
      // e.target.reset();
      
      setTimeout(() => {
        dispatchEvent(pageLoader(false));
      },500);
      setLoading(false);

      setError(null);
      
    }catch(error){
      setError(error.message);
      dispatchEvent(pageLoader(false));
      setLoading(false);

    }
  }

  return (
    
    

      <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7' >
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {error && <p className='text-red-500'>User already registered</p>}

        <input type='text' className='border p-3 rounded-lg' id="username" placeholder='username' onChange={handleChange} required />

        <input type="email" placeholder='email' className='border p-3 rounded-lg' id="email" onChange={handleChange} required/>

        <input type="password" placeholder='password' className='border p-3 rounded-lg' id="password" onChange={handleChange} required />

        <button disabled={loading} type='submit' className='bg-violet-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-95'>{loading ? "Loaging..." : "Sign Up"}</button>

        
      </form>
      <div className='flex flex-col gap-4 mt-8'>
        <p>Have an account?</p>

        <GoogleAuth/>

        <Link to='/signin'>
          <p disabled={loading} className='bg-blue-700 text-white p-3 rounded-lg text-center uppercase hover:opacity-95 disabled:opacity-95'>{loading ? "Loaging..." : "Login"}</p>
        </Link>
      </div>
    </div>
    
  )
}
