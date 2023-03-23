/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../public/Loading";
import SocialLogin from "./SocialLogin";
import trimError from "../../hooks/trimError";
import axios from "axios";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const Signup = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    let from = location.state?.from?.pathname || "/";
    const { register, formState: { errors }, handleSubmit } = useForm();


    // sing up function
    const onSubmit = async (data) => {
        setLoading(true);

        // assamble user credential
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const repeatPassword = data.repeatPassword;

        // check password with repeatPassword
        if (password === repeatPassword) {
            try {
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(auth.currentUser, { displayName: name });
                const currentUser = {
                    uid: user.uid,
                    name: name,
                    email: user.email,
                    phone: '',
                    address: '',
                    linkedIn: ''
                }
                await axios.put(`https://mna-sensors-server.onrender.com/user/${user.uid}`, currentUser);
                console.log(currentUser);
                navigate(from, { replace: true });
                setLoading(false);
            } catch (err) {
                toast.error(trimError(err), { theme: 'colored' });
            }
        } else {
            setLoading(false);
            return;
        }
    };

    if (user) {
        console.log(user);
        navigate(from, { replace: true });
    }


    return (
        <div className="fadeIn min-h-screen flex justify-center items-center py-5">
            {loading && <Loading />}
            <div className="card w-96 bg-white border-2 shadow-md">
                <div className="card-body">
                    <h2 className="text-center text-xl font-bold">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="Text"
                                placeholder="Enter Your Name"
                                className="input input-bordered"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name is required",
                                    },
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === "required" && (
                                    <span className="label-text-alt text-[red]">
                                        {errors.name.message}
                                    </span>
                                )}
                            </label>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="input input-bordered"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required",
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: "Provide A Valid Email",
                                    },
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === "required" && (
                                    <span className="label-text-alt text-[red]">
                                        {errors.email.message}
                                    </span>
                                )}
                                {errors.email?.type === "pattern" && (
                                    <span className="label-text-alt text-[red]">
                                        {errors.email.message}
                                    </span>
                                )}
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                className="input input-bordered"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                        message:
                                            "Must Contain 8 Characters including 1 Uppercase & 1 Lowercase Letter",
                                    },
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === "required" && (
                                    <span className="label-text-alt text-[red]">
                                        {errors.password.message}
                                    </span>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <span className="label-text-alt text-[red]">
                                        {errors.password.message}
                                    </span>
                                )}
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Re-enter Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                className="input input-bordered"
                                {...register("repeatPassword", {
                                    required: {
                                        value: true,
                                        message: "Please Re-enter the password",
                                    },
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === "required" && (
                                    <span className="label-text-alt text-[red]">
                                        {errors.password.message}
                                    </span>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <span className="label-text-alt text-[red]">
                                        {errors.password.message}
                                    </span>
                                )}
                            </label>
                        </div>
                        {/* {signInError} */}
                        <div className="form-control mt-6">
                            <input type="submit" className="btn" value="Sign up" />
                        </div>
                    </form>
                    <p className="text-sm text-center">
                        Already have an account?
                        <Link className="text-primary ml-2" to="/login">
                            Login Here
                        </Link>
                    </p>
                    <div className="divider">OR</div>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Signup;