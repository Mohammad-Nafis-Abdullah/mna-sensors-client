/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./components/public/NotFound";
import React, { createContext, useEffect } from "react";
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
import Modal from "./utilities/Modal";
import useStateReducer from "./hooks/useStateReducer";
import useFetch from "./hooks/useFetch";
import Loading from "./components/public/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase.init";
import Navbar from "./components/public/Navbar";

const StateContext = createContext();
export { StateContext }

function App() {
  const [state,dispatch] = useStateReducer();
  const [user] = useAuthState(auth);
  const { pathname } = useLocation();

  const { data:profile, loading, refetch } = useFetch(`http://localhost:5000/user/${user?.email}`,null,(profile)=> {
    dispatch({
      type:'user',
      value:profile
    });
  });

  useEffect(()=> {
      window.scrollTo(0, 0);
      if (user && !profile) {
        refetch();
      };
  },[user,pathname]);

  return (
    <StateContext.Provider value={[state,dispatch]}>
      {loading && <Loading/>}
      <div className={``}>

        <Navbar />

        <div className={`min-h-[calc(100vh-144px)] fadeIn`}>
          <Routes>
            <Route path="/home" element={<Navigate to={"/"} />} />
            <Route path="/" element={<Home />} />
            <Route path="/purchase/:id" element={<Private> <Purchase /> </Private>} />

            <Route path="/dashboard" element={<Private> <Dashboard /> </Private>} >

              <Route index element={<Navigate to={'/dashboard/my-profile'} />} />
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="add-review" element={<AddAReview />} />
              <Route path="my-orders" element={<MyOrders />} />
              <Route path="payment/:id" element={<Payment />} />

              <Route path="make-admin" element={<RequireAdmin> <MakeAdmin /> </RequireAdmin>} />
              <Route path="add-sensor" element={<RequireAdmin> <AddATool /> </RequireAdmin>} />
              <Route path="manage-sensors" element={<RequireAdmin> <ManageTools /> </RequireAdmin>} />
              <Route path="manage-all-orders" element={<RequireAdmin> <ManageAllOrders /> </RequireAdmin>} />

            </Route>

            <Route path="/reviews" element={<ReviewsComp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>


        <Footer />

        <ToastContainer />
        <Modal />
      </div>
    </StateContext.Provider>
  );
}

export default App;
