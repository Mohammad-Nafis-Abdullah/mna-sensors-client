import React, { useContext, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { StateContext } from "../../App";


const Dashboard = () => {
    const [state] = useContext(StateContext);
    const admin = useAdmin();
    const {pathname} = useLocation();
    const [open,setOpen] = useState(false);

    const navStyling = ({isActive})=> {
        return `btn-ghost ${isActive?'text-amber-400':'text-white'} font-bold`
    };

    const showPath = ()=> {
        return `${pathname.split('dashboard')[1]}`;
    }

    return (
        <div className="bg-neutral-focus min-h-[calc(100vh-144px)] h-auto">
            <div className="lg:pl-[16.5rem] lg:pr-0">
                <h2 className="font-bold btn-ghost text-white text-2xl text-center inline-flex items-baseline gap-x-1 px-2">
                    dashboard
                    <small className="font-medium text-base">{showPath()}</small>
                </h2>
                <div className="h-auto lg:w-[calc(100%-1rem)]">
                    <Outlet />
                </div>

                <BsFillArrowRightSquareFill onClick={()=>setOpen(prev=>!prev)} className={`lg:hidden text-amber-400 w-10 h-10 fixed top-32 cursor-pointer ${open?'left-64 rotate-180':'left-0'} transition-all duration-300 bg-black rounded-lg`}/>
            </div>

            <div className="">
                <label className="drawer-overlay"></label>
                <ul className={`menu p-3 overflow-y-auto w-64 bg-neutral text-base-content fixed top-[72px] bottom-[0] transition-transform duration-300 ${open?'translate-x-0':'-translate-x-64'} lg:translate-x-0`}>
                    {/* <!-- Sidebar content here --> */}

                    <li>
                        <NavLink 
                            className={navStyling}
                            to="/dashboard/my-profile"
                        >
                            My Profile
                        </NavLink>
                    </li>
                    {state.user && !admin && (
                        <>
                            <li>
                                <NavLink
                                    className={navStyling}
                                    to="/dashboard/my-orders"
                                >
                                    My Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={navStyling}
                                    to="/dashboard/add-review"
                                >
                                    Add A Review
                                </NavLink>
                            </li>
                        </>
                    )}

                    {admin && (
                        <>
                            <li>
                                <NavLink
                                    className={navStyling}
                                    to="/dashboard/make-admin"
                                >
                                    Make Admin
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={navStyling}
                                    to="/dashboard/add-sensor"
                                >
                                    Add A Sensor
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink
                                    className={navStyling}
                                    to="/dashboard/manage-sensors"
                                >
                                    Manage Sensors
                                </NavLink>
                            </li> */}
                            <li>
                                <NavLink
                                    className={navStyling}
                                    to="/dashboard/manage-all-orders"
                                >
                                    Manage All Orders
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;