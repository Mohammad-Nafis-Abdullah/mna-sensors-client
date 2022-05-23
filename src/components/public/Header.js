import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const Navbar = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const logout = () => {
        signOut(auth);
        navigate('/');
        localStorage.removeItem("accessToken");
    };
    const menuItems = (
        <>
            <li>
                <Link to="/">Home</Link>
            </li>
            {user && 
                <>
                <li tabindex="0">
                    <span>
                        User
                        <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                    </span>
                    <ul class="p-2 z-50 border-2 bg-gray-700 text-white">
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/myprofile">My Profile</Link>
                        </li>
                    </ul>
                </li>
                    {/* <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/myprofile">My Profile</Link>
                    </li> */}
                </>
            }
            <li>
                <Link to="/reviews">Reviews</Link>
            </li>

            <li>
                <Link to="/myporfolio">My Portfolio</Link>
            </li>
            <li>
                <Link to="/blogs">Blogs</Link>
            </li>
            <li>
                {user ? (
                    <button className="btn text-white" onClick={logout}>Sign Out</button>
                ) : (
                    <Link className="btn text-white" to="/login">Login</Link>
                )}
            </li>
        </>
    );
    return (
        <div className="shadow-md">
            <div className="navbar bg-base-100 container">
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
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
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