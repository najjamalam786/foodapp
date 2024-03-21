import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";


// when you access to the profile after signOut by using "/profile" you can't access it that is called privateRout
export default function AdminPrivateRout() {
    const {currentUser} = useSelector(state => state.user);

  return (
    <>
    {currentUser.isAdmin ? <Outlet /> : <Navigate to='/signin'/>}
    </>
  )
}