import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./components/public/NotFound";
import Header from "./components/public/Header";
import { useEffect } from "react";
import Login from "./components/public/Login";
import SignUp from "./components/public/SignUp";
import Home from "./components/public/home/Home";
import Footer from "./components/public/Footer";
import Private from "./components/private/Private";
import Purchase from "./components/private/purchase/Purchase";
import { ToastContainer } from "react-toastify";
import Blog from "./components/public/blog/Blog";
import Dashboard from "./components/private/Dashboard";
import MyPortfolio from "./components/public/myportfolio/MyPortfolio";
import MyProfile from "./components/private/MyProfile";
import AddAReview from "./components/private/user/AddAReview";
// import MyOrders from "./components/private/user/MyOrders";


function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  return (
    <div className="">
      
      <Header/>

      <div className="min-h-[calc(100vh-144px)] fadeIn">
        <Routes>
          <Route path="/home" element={<Navigate to={"/"}/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/purchase/:id" element={<Private>
            <Purchase/>
          </Private>}/>

          <Route
            path="/dashboard"
            element={
              <Private>
                <Dashboard />
              </Private>
            }
          >
            <Route index element={<MyProfile />} />
            <Route path="addReview" element={<AddAReview />} />
            {/* <Route path="myOrders" element={<MyOrders />} /> */}
            {/* <Route
              path="makeAdmin"
              element={
                <RequireAdmin>
                  <MakeAdmin />
                </RequireAdmin>
              }
            />
            <Route
              path="addTool"
              element={
                <RequireAdmin>
                  <AddATool />
                </RequireAdmin>
              }
            />
            <Route
              path="manageTools"
              element={
                <RequireAdmin>
                  <ManageTools />
                </RequireAdmin>
              }
            /> */}
          </Route>
          
          <Route path="/myportfolio" element={<MyPortfolio/>}/>
          <Route path="/blogs" element={<Blog/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Signup" element={<SignUp/>}/>
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </div>


      <Footer/>

      <ToastContainer/>
    </div>
  );
}

export default App;
