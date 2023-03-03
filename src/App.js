/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./components/public/NotFound";
import Header from "./components/public/Header";
import React, { createContext, useEffect, useState } from "react";
import Login from "./components/public/Login";
import SignUp from "./components/public/SignUp";
import Home from "./components/public/home/Home";
import Footer from "./components/public/Footer";
import Private from "./components/private/Private";
import Purchase from "./components/private/purchase/Purchase";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/private/Dashboard";
import MyProfile from "./components/private/MyProfile";
import AddAReview from "./components/private/user/AddAReview";
import MyOrders from "./components/private/user/MyOrders";
import Payment from "./components/private/user/Payment"
import RequireAdmin from "./components/private/RequireAdmin"
import MakeAdmin from "./components/private/admin/MakeAdmin"
import AddATool from "./components/private/admin/AddATool"
import ManageTools from "./components/private/admin/ManageTools"
import ReviewsComp from "./components/public/ReviewsComp";
import ManageAllOrders from "./components/private/admin/ManageAllOrders";

// const StateContext = createContext();
// export { StateContext }

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
      <div className={``}>

        <Header />

        <div className={`min-h-[calc(100vh-144px)] fadeIn`}>
          <Routes>
            <Route path="/home" element={<Navigate to={"/"} />} />
            <Route path="/" element={<Home />} />
            <Route path="/purchase/:id" element={<Private> <Purchase /> </Private>} />

            <Route path="/dashboard" element={<Private> <Dashboard /> </Private>} >

              <Route index element={<MyProfile />} />
              <Route path="my-profile" element={<Navigate to={'/dashboard'}/>}/>
              <Route path="addReview" element={<AddAReview />} />
              <Route path="myOrders" element={<MyOrders />} />
              <Route path="payment/:id" element={<Payment />} />

              <Route path="makeAdmin" element={<RequireAdmin> <MakeAdmin /> </RequireAdmin>} />
              <Route path="addSensor" element={<RequireAdmin> <AddATool /> </RequireAdmin>} />
              <Route path="manageSensors" element={<RequireAdmin> <ManageTools /> </RequireAdmin>} />
              <Route path="manageAllOrders" element={<RequireAdmin> <ManageAllOrders /> </RequireAdmin>} />

            </Route>

            <Route path="/reviews" element={<ReviewsComp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>


        <Footer />

        <ToastContainer />
      </div>
  );
}

export default App;
