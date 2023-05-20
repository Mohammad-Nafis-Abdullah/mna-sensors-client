/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { StateContext } from "../../App";
import { imgUrl } from "../../hooks/useMyStorage";
import axios from "axios";


const Navbar = () => {
    const [user,loading,error] = useAuthState(auth);
    const [state,dispatch] = useContext(StateContext);
    const navigate = useNavigate();
    const [dropDown,setDropDown] = useState(false);
    console.log(state);

    useEffect(()=> {
        if (user) {
            axios.get(`${process.env.REACT_APP_Backend_url}/user/${user?.uid}`).then(({data})=> {
                dispatch('user',data);
            })
        }
    },[user])

    const img = imgUrl(state?.user?.img) || "https://i.ibb.co/pvmWXsv/male-placeholder-image.jpg";
    
    const logout = () => {
        setDropDown(false);
        signOut(auth);
        dispatch('user',null);
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
                        <img src={img} alt="" className={`w-10 h-10 cursor-pointer rounded-full object-scale-down`} onClick={() => setDropDown(prev => !prev)} />
                        <div className={`w-56 h-44 absolute left-12 top-[50%] lg:left-auto lg:top-12 lg:-right-3 rounded-xl overflow-hidden flex flex-col ${!dropDown && 'hidden'} bg-gray-300 border-4 p-3 justify-between z-50`}>
                            <img src={img} alt="" className="w-14 h-14 cursor-pointer self-center rounded-full object-scale-down" />
                            <small className="font-bold self-center select-none underline underline-offset-2 cursor-pointer" title="Click to copy email" onClick={(e)=> {
                                navigator.clipboard.writeText(e.target.innerText).then(()=> {
                                    toast.success('Email Coppied to Clipboard',{theme:'dark'});
                                });
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
            </div>
        </div>
    );
};

export default Navbar;