import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const {pathname} = useLocation();


    const navStyling = ({isActive})=> {
        return `btn-ghost ${isActive?'text-amber-400':'text-white'} font-bold`
    };

    const showPath = ()=> {
        return `${pathname.split('dashboard')[1]}`
    }

    return (
        <div className="drawer drawer-mobile bg-neutral-focus">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content mt-2 px-2 flex justify-between flex-wrap items-center content-start gap-3">
                <h2 className="font-bold btn-ghost text-white text-2xl text-center inline-flex items-baseline gap-x-1">
                    dashboard
                    <small className="font-medium text-base">{showPath()}</small>
                </h2>
                <div className="basis-full overflow-auto py-2">
                    <Outlet />
                </div>
            </div>
            <div className="drawer-side ">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-64 bg-neutral text-base-content">
                    {/* <!-- Sidebar content here --> */}

                    <li>
                        <NavLink 
                            className={navStyling}
                            to="/dashboard/my-profile"
                        >
                            My Profile
                        </NavLink>
                    </li>
                    {user && !admin && (
                        <>
                            <li>
                                <NavLink
                                    className={navStyling}
                                    to="/dashboard/myOrders"
                                >
                                    My Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={navStyling}
                                    to="/dashboard/addReview"
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
                                    to="/dashboard/makeAdmin"
                                >
                                    Make Admin
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={navStyling}
                                    to="/dashboard/addSensor"
                                >
                                    Add A Sensor
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={navStyling}
                                    to="/dashboard/manageSensors"
                                >
                                    Manage Sensors
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={navStyling}
                                    to="/dashboard/manageAllOrders"
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