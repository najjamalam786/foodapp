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
import { useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
// import { useState } from "react";
// import { getAllFoodItems } from "./utils/firebaseFunctions";
// import { actionType } from "./context/reducer";

const App = () => {
  const { showCart } = useSelector((state) => state.item);
  const result = showCart;




  return (
    <BrowserRouter>
      <Header />
      {result && <CartContainer/>}
      <main className="mt-2 md:mt-4 px-4 md:px-16 py-4 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<Login />} />

          <Route element={<PrivateRout />}>

            
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
