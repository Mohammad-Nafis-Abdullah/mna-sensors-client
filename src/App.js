import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./components/public/NotFound";
import Header from "./components/public/Header";
import { useEffect } from "react";
import Login from "./components/public/Login";
import SignUp from "./components/public/SignUp";


function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  return (
    <div className="">
      
      <Header/>

      <Routes>
        <Route path="/" element={''}/>

        

        <Route path="/login" element={<Login/>}/>
        <Route path="/Signup" element={<SignUp/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>

    </div>
  );
}

export default App;
