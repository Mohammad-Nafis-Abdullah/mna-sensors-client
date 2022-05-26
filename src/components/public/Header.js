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
                <Link to="/" className="btn-xs font-medium text-sm">Home</Link>
            </li>
            {user &&
                <>
                    <li>
                        <Link to="/dashboard" className="btn-xs font-medium text-sm">Dashboard</Link>
                    </li>
                </>
            }
            <li>
                <Link to="/reviews" className="btn-xs font-medium text-sm">Reviews</Link>
            </li>

            <li>
                <Link to="/myportfolio" className="btn-xs font-medium text-sm">My Portfolio</Link>
            </li>
            <li>
                <Link to="/blogs" className="btn-xs font-medium text-sm">Blogs</Link>
            </li>
            <li>
                {user ? (
                    <button className="link text-xs" onClick={logout}>Logout <br />{user?.displayName}</button>
                ) : (
                    <Link className="link" to="/login">Login</Link>
                )}
            </li>
        </>
    );

    // console.log(user);
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
                <div className="navbar-end lg:hidden">
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