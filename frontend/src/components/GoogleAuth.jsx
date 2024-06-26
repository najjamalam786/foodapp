import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.config.js';
import { useDispatch } from 'react-redux';
import { signInSuccess, userEmail, userMobileAuth } from '../redux/createSlice/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { FaGooglePlus } from "react-icons/fa6";


export default function GoogleAuth() {

    const dispatch = useDispatch();
    const navigator = useNavigate();

    const handleGoogleClick = async () => {
        
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            
            // signIn popup window using firebase authentication
            const result = await signInWithPopup(auth, provider);

            
            const res = await fetch('api/user/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),
            })
            
            const data = await res.json();

            if(data && data.userAuth){
                
                dispatch(signInSuccess(data));
                navigator('/');
            }
            else{
                dispatch(userEmail(data.email));
                dispatch(userMobileAuth(true));
            }
            // add user in "currentUser" state

            
        }catch(err){
            console.log("could not sign in with google", err);
        }
    }

  return (
    <>
        <button onClick={handleGoogleClick} type="button" className='bg-red-700 text-white p-3 flex items-center justify-center gap-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-95'><FaGooglePlus size={25}/>  Contunue with google </button>
        
    </>
  )
}
