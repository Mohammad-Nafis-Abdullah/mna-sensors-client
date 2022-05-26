import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <div className="drawer drawer-mobile bg-neutral-focus">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content mt-2 px-2 flex justify-between flex-wrap items-center content-start gap-3">
                <h2 className="font-bold btn-ghost text-white text-2xl text-center">
                    Dashboard
                </h2>
                <h2 className="font-bold btn-ghost text-white text-xs text-center">
                    {user.email}
                </h2>
                <div className="basis-full overflow-auto py-8">
                    <Outlet />
                </div>
            </div>
            <div className="drawer-side ">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-64 bg-neutral glass text-base-content">
                    {/* <!-- Sidebar content here --> */}

                    <li>
                        <Link className="btn-ghost text-white font-bold" to="/dashboard">
                            My Profile
                        </Link>
                    </li>
                    {user && !admin && (
                        <>
                            <li>
                                <Link
                                    className="btn-ghost text-white font-bold"
                                    to="/dashboard/myOrders"
                                >
                                    My Orders
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="btn-ghost text-white font-bold"
                                    to="/dashboard/addReview"
                                >
                                    Add A Review
                                </Link>
                            </li>
                        </>
                    )}

                    {admin && (
                        <>
                            <li>
                                <Link
                                    className="btn-ghost text-white font-bold"
                                    to="/dashboard/makeAdmin"
                                >
                                    Make Admin
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="btn-ghost text-white font-bold"
                                    to="/dashboard/addSensor"
                                >
                                    Add A Sensor
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="btn-ghost text-white font-bold"
                                    to="/dashboard/manageSensors"
                                >
                                    Manage Sensors
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;