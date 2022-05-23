import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./components/public/NotFound";
import Header from "./components/public/Header";
import { useEffect } from "react";
import Login from "./components/public/Login";
import SignUp from "./components/public/SignUp";
import Home from "./components/public/home/Home";
import Footer from "./components/public/Footer";
import Private from "./components/private/Private";
import Purchase from "./components/private/purchase/Purchase";


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

          

          <Route path="/login" element={<Login/>}/>
          <Route path="/Signup" element={<SignUp/>}/>
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </div>


      <Footer/>
    </div>
  );
}

export default App;
