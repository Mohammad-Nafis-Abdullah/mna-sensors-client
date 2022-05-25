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
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase.init";
import Dashboard from "./components/private/Dashboard";
import MyPortfolio from "./components/public/myportfolio/MyPortfolio";


function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [user] = useAuthState(auth);

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

          {
            user && 
            <Route path="/dashboard" element={<Dashboard/>}>

            </Route>
          }
          
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
