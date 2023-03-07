import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    useSignInWithEmailAndPassword,
    useSendPasswordResetEmail,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../public/Loading";
import SocialLogin from "./SocialLogin";
import useToken from "../../hooks/useToken";
import trimError from "../../hooks/trimError";



const Login = () => {
    const emailRef = useRef("");
    const navigate = useNavigate();
    const location = useLocation();
    let from = location?.state?.from?.pathname || "/home";
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    //Sign In with Email and Password
    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);

    // Password Reset
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    const [token] = useToken(user);
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from]);

    if (loading || sending) {
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

    // Login Form Submit Function
    const onSubmit = (data) => {
        // console.log(data);
        const email = data.email;
        const password = data.password;
        signInWithEmailAndPassword(email, password);
    };

    // Password Reset Function
    const resetPassword = async () => {
        const email = emailRef.current.value;
        // console.log(email);
        if (email) {
            await sendPasswordResetEmail(email);
            toast.success(`Email has been sent to ${email}`, { theme: "colored" });
        } else {
            toast.error("Opps!!! Enter your Email First", { theme: "colored" });
        }
    };
    return (
        <div className="fadeIn min-h-screen flex justify-center items-center py-5">
            <div className="card w-96 border-2 shadow-md bg-white">
                <div className="card-body">
                    <h2 className="text-center text-xl font-bold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            <input type="submit" className="btn" value="Login" />
                        </div>
                        <label
                            htmlFor="reset-pass-modal"
                            onClick={resetPassword}
                            to=""
                            className="label-text-alt link link-hover"
                        >
                            Forgot password?
                        </label>
                    </form>
                    <p className="text-sm text-center">
                        New to Doctors Portal?
                        <Link className="text-primary ml-2" to="/signup">
                            Create New Account
                        </Link>
                    </p>
                    <div className="divider">OR</div>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;