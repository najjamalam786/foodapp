// import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";
// import { useStateValue } from "./context/StateProvider";
import Header from "./components/Header";
import Success from "./components/Success";
import Error from "./components/Error";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UploadFood from "./pages/UploadFood";
import PrivateRout from "./components/PrivateRout";
import AdminPrivateRout from "./components/AdminPrivateRout";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import ShippingAddress from "./pages/ShippingAddress";
import Main from "./Main_2";
import { showNavBar } from "./redux/createSlice/itemSlice";
import { useEffect } from "react";
import UserOrder from "./pages/UserOrder";
import { deleteSuccess } from "./redux/createSlice/userSlice";


const App = () => {

  const { showCart, showNav } = useSelector((state) => state.item);
  const dispatch = useDispatch();
  

useEffect(() => {
  const fetchVerifyUser = async() => {
    console.log("data");
    const res = await fetch("/api/user/verify")

    const data = await res.json();
    if(data === null ){
      dispatch(deleteSuccess(data))
    }
    
    
  }

  fetchVerifyUser();

  if(window.location.pathname === "/order-create") {
    dispatch(showNavBar(false));
  }else{
  dispatch(showNavBar(true));
}
}, [])


  return (
    <BrowserRouter>
      {showNav && <Header />}
      {showCart && <Main><CartContainer /></Main>}
      <main className="mt-2 md:mt-4 px-4 md:px-16 py-4 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<Login />} />

          <Route element={<PrivateRout />}>

            <Route path="/order-create" element={<ShippingAddress/>} />
            <Route path="/user-orders" element={<UserOrder/>} />
            
            <Route element={<AdminPrivateRout />}>
              <Route path="/createItem" element={<UploadFood />} />
            </Route>

          </Route>


          <Route path="/success" element={<Success />} />
          <Route path="/*" element={<Error />} />

        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
