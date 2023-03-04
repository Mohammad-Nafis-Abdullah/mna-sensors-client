import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import { FaUserCircle } from 'react-icons/fa';
import { toast } from "react-toastify";
import Loading from "./Loading";


const Navbar = () => {
    const [user,loading,error] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation();
    const [dropDown,setDropDown] = useState(false);

    const logout = () => {
        setDropDown(false);
        signOut(auth);
        navigate('/');
        localStorage.removeItem("accessToken");
    };
    const menuItems = (
        <div className="flex flex-col lg:flex-row lg:items-center gap-x-5 gap-y-2 px-5">
                <Link to="/" className="font-medium text-sm">Home</Link>
            {user && !loading &&
            <Link to="/dashboard" className="font-medium text-sm">Dashboard</Link>
            }
            <Link to="/reviews" className="font-medium text-sm">Reviews</Link>
            <div className="self-center">
                {user ? (
                    <div className="text-xs relative z-20">
                        <FaUserCircle className={`w-10 h-10 cursor-pointer ${dropDown && 'text-amber-400'}`} onClick={() => setDropDown(prev => !prev)} />
                        <div className={`w-56 h-44 absolute left-12 top-[50%] lg:left-auto lg:top-12 lg:-right-3 rounded-xl overflow-hidden flex flex-col ${!dropDown && 'hidden'} bg-gray-300 border-4 p-3 justify-between z-50`}>
                            <FaUserCircle className="w-10 h-10 cursor-pointer self-center" />
                            <small className="font-bold self-center select-none underline underline-offset-2" onClick={(e)=> {
                                navigator.clipboard.writeText(e.target.innerText).then(()=> {
                                    toast.success('Text Coppied',{theme:'dark'});
                                })
                            }}>{user.email}</small>
                            <button className="btn btn-sm" onClick={()=> {
                                setDropDown(false);
                                navigate('dashboard/my-profile')
                            }}>My profile</button>
                            <button className="btn btn-sm" onClick={logout}>Logout</button>
                        </div>
                    </div>
                ) : 
                    (!loading && <Link className="btn btn-sm" to="/login">Login</Link>)
                }
            </div>
        </div>
    );

    // console.log(user);
    return (
        <div className="shadow-md sticky top-0 z-[999] bg-white">
            {loading && <Loading/>}
            {error && toast.error('There was an error',{theme:'colored'})}
            <div className="navbar bg-base-100 max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex="0"
                            className="menu menu-compact dropdown-content mt-2 p-5 shadow bg-white border-4 rounded-box w-52 lg:hidden"
                        >
                            {menuItems}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost normal-case text-xl">
                        MNA Sensors
                    </Link>
                </div>
                <div className="navbar-end hidden lg:flex mx-auto">
                    <ul className="menu menu-horizontal p-0">{menuItems}</ul>
                </div>
                <div className={`navbar-end lg:hidden ${location.pathname.includes('/dashboard') || 'hidden'}`} >
                    <label
                        htmlFor="dashboard-drawer"
                        className="btn btn-circle swap swap-rotate lg:hidden"
                    >
                        <input type="checkbox" />

                        {/* <!-- hamburger icon --> */}
                        <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>

                        {/* <!-- close icon --> */}
                        <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                    </label>
                </div>

            </div>
        </div>
    );
};

export default Navbar;