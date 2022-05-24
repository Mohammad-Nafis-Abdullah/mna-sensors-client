import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin"

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <div className="drawer drawer-mobile bg-neutral-focus">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content pt-5 space-y-3">
                <h2 className="font-bold text-white underline-offset-2 underline text-2xl text-center">
                    Dashboard
                </h2>
                <h2 className="font-bold text-white text-xs text-center">
                    Logged In as : {user?.email}
                </h2>

                <Outlet />
            </div>
            <div className="drawer-side ">
                {/* <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> */}
                <ul className="menu p-4 overflow-y-auto w-64 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li>
                        <Link className="dashboard-btn" to="/dashboard">
                            My Appointments
                        </Link>
                    </li>
                    <li>
                        <Link className="dashboard-btn" to="/dashboard/review">
                            Add a Review
                        </Link>
                    </li>
                    <li>
                        <Link className="dashboard-btn" to="/dashboard/history">
                            My Treatment History
                        </Link>
                    </li>
                    {admin && (
                        <>
                            <li>
                                <Link
                                    className="dashboard-btn"
                                    to="/dashboard/users"
                                >
                                    All Users
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dashboard-btn"
                                    to="/dashboard/addDoctor"
                                >
                                    Add A Doctor
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dashboard-btn"
                                    to="/dashboard/manageDoctor"
                                >
                                    Manage Doctors
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