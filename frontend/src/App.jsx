// import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import CartContainer from "./components/CartContainer";
import ShippingAddress from "./pages/ShippingAddress";
import Main from "./Main_2";
import UserOrder from "./pages/UserOrder";
import Loader from "./components/Loader";
import ShowNavBar from "./components/ShowNavBar";
import ConfirmOrder from "./pages/ConfirmOrder";
import MobileAuthentication from "./pages/MobileAuthentication";
import UserMember from "./pages/UserMember";
import MobUser from "./pages/MobUser";
import UserAddress from "./pages/UserAddress";
import HelpCenter from "./pages/HelpCenter";
import ScrollTop from "./components/ScrollTop";
import AboutUs from "./pages/AboutUs";


const App = () => {

  const { showCart } = useSelector((state) => state.item);
  const { loading, confirmOrder } = useSelector((state) => state.order);
  const { mobileAuth } = useSelector((state) => state.user);



  return (
    <BrowserRouter>


      {mobileAuth && <Main><MobileAuthentication /></Main>}

      {loading && <Main><Loader /></Main>}

      {confirmOrder && <Main><ConfirmOrder /></Main>}

      <ScrollTop />
      <ShowNavBar>
        <Header />

      </ShowNavBar>

      {showCart && <Main><CartContainer /></Main>}

      {/* <main className="mt-2 md:mt-4 px-4 md:px-16 py-4 w-full"> */}
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/mobile-auth" element={<MobileAuthentication />} /> */}
        <Route path="/signin" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />

        <Route element={<PrivateRout />}>

          <Route path="/order-create" element={<ShippingAddress /> } />

          <Route path="/user-orders" element={<UserOrder />} />
          <Route path="/user-member" element={<UserMember />} />
          <Route path="/user-profile" element={<MobUser />} />
          <Route path="/user-address" element={<UserAddress />} />
          <Route path="/help-center" element={<HelpCenter />} />


          <Route element={<AdminPrivateRout />}>
            <Route path="/createItem" element={<UploadFood />} />
          </Route>

        </Route>


        <Route path="/success" element={<Success />} />
        <Route path="/*" element={<Error />} />

      </Routes>
      {/* </main> */}

      <ShowNavBar> <Footer /> </ShowNavBar>

    </BrowserRouter>
  );
};

export default App;
