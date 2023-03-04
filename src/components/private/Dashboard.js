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
        return `${pathname.split('dashboard')[1]}`;
    }

    return (
        <div className="drawer drawer-mobile bg-neutral-focus min-h-[calc(100vh-144px)] h-auto">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex justify-between flex-wrap items-center content-start gap-3">
                <h2 className="font-bold btn-ghost text-white text-2xl text-center inline-flex items-baseline gap-x-1 px-2">
                    dashboard
                    <small className="font-medium text-base">{showPath()}</small>
                </h2>
                <div className="basis-full overflow-auto">
                    <Outlet />
                </div>
            </div>
            <div className="drawer-side relative lg:w-64 lg:bg-neutral" style={{
                maxHeight:'none'
            }}>
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <ul className="menu p-3 overflow-y-auto w-64 bg-neutral text-base-content lg:fixed lg:top-[72px] lg:bottom-[72px]">
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
                            <li>
                                <NavLink
                                    className={navStyling}
                                    to="/dashboard/manage-sensors"
                                >
                                    Manage Sensors
                                </NavLink>
                            </li>
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