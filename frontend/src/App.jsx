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
import { useEffect } from "react";
import UserOrder from "./pages/UserOrder";
import { deleteSuccess } from "./redux/createSlice/userSlice";
import { pageLoader } from "./redux/createSlice/orderSlice";
import Loader from "./components/Loader";
import ShowNavBar from "./components/ShowNavBar";
import ConfirmOrder from "./pages/ConfirmOrder";
import MobileAuthentication from "./pages/MobileAuthentication";
// import MobileAuthentication from "./pages/MobileAuthentication";


const App = () => {

  const { showCart, cartItems } = useSelector((state) => state.item);
  const { loading, confirmOrder } = useSelector((state) => state.order);
  const { mobileAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  

useEffect(() => {
  dispatch(pageLoader(true));

  
  const fetchVerifyUser = async() => {
    
    const res = await fetch("/api/user/verify")

    const data = await res.json();

    setTimeout(() => {
      dispatch(pageLoader(false))
    }, 800);

    if(data === null ){
      dispatch(deleteSuccess(data))
    }
    
    
  }
  
  
  fetchVerifyUser();
  setTimeout(() => {
    dispatch(pageLoader(false))
  }, 800);
}, [])


  return (
    <BrowserRouter>

      {mobileAuth && <Main><MobileAuthentication /></Main>}

      {loading && <Main><Loader /></Main>}

      {confirmOrder && <Main><ConfirmOrder /></Main>}

      <ShowNavBar>
         <Header />

      </ShowNavBar>

      {showCart && <Main><CartContainer /></Main>}

      <main className="mt-2 md:mt-4 px-4 md:px-16 py-4 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/mobile-auth" element={<MobileAuthentication />} /> */}
            <Route path="/signin" element={<Login />} />

          <Route element={<PrivateRout />}>

            <Route path="/order-create" element={cartItems.length > 0 && <ShippingAddress/>} />
            
            <Route path="/user-orders" element={<UserOrder/>} />
            
            <Route element={<AdminPrivateRout />}>
              <Route path="/createItem" element={<UploadFood />} />
            </Route>

          </Route>


          <Route path="/success" element={<Success />} />
          <Route path="/*" element={<Error />} />

        </Routes>
      </main>
      
      <ShowNavBar> <Footer /> </ShowNavBar>

    </BrowserRouter>
  );
};

export default App;
