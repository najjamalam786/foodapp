import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function ShowNavBar({children}) {
    const location = useLocation();
    const [showNav, setShowNav] = useState(false);


    useEffect(() => {

        if(location.pathname === "/user-profile" || location.pathname === "/order-create" || location.pathname === "/signin" || location.pathname === "/signup" || location.pathname === "/success" || location.pathname === "/user-orders"){ 
            setShowNav(false);
        }
        else{
            setShowNav(true);
        }
    })
  return (
    <div>{showNav && children}</div>
  )
}
