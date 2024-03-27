import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function ShowNavBar({children}) {
    const location = useLocation();
    const [showNav, setShowNav] = useState(false);


    useEffect(() => {

        if(location.pathname === "/order-create") {
            setShowNav(false);
        }else{
            setShowNav(true);
        }
    })
  return (
    <div>{showNav && children}</div>
  )
}
