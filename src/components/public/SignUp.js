/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import useToken from "../../hooks/useToken";
import Loading from "../public/Loading";
import SocialLogin from "./SocialLogin";
import trimError from "../../hooks/trimError";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    //Creating User with Email And Password
    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    //Updating Profile
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        const name = data.name;
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
        // console.log(updateError);
        await axios.put(`https://cryptic-tor-95332.herokuapp.com/user/${email}`, { email: email, name: name, phone: '', address: '', linkedIn: '' });
    };

    const [token] = useToken(user);
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from]);

    if (loading) {
        return <Loading />;
    }

    let signInError;
    if (error) {
        signInError = (
            <p className="text-[red]">
                <span>{trimError(error)}</span>
            </p>
        );
    }
    return (
        <div className="fadeIn min-h-screen flex justify-center items-center py-5">
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
                        {signInError}
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