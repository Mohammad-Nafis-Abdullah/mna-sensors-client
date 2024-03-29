/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import trimError from "../../hooks/trimError";
import Loading from "../public/Loading";
import { StateContext } from "../../App";

const SocialLogin = () => {
    const [currentUser] = useAuthState(auth);
    const [state,dispatch] = useContext(StateContext);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    //Google Sign In
    const [signInWithGoogle, googleUser, googleLoading, googleError] =
        useSignInWithGoogle(auth);

    useEffect(() => {
        if (currentUser) {
            navigate(from, { replace: true });
        }
    }, [currentUser]);

    if (googleLoading) {
        return <Loading />;
    }

    const sendUserToDb = async () => {
        const newUser = {
            uid: googleUser?.user?.uid,
            email: googleUser?.user?.email,
            name: googleUser?.user?.displayName,
        }
        const returnUser = await axios.put(`${process.env.REACT_APP_Backend_url}/user/${googleUser?.user?.uid}`, newUser);
        dispatch('user',returnUser);
        toast.success(`Welcome to the web site`, { theme: 'colored' });
    }

    if (googleUser && !googleLoading) {
        sendUserToDb();
    }

    if (googleError) {
        toast.error(trimError(googleError), { theme: 'colored' });
    }
    return (
        <div>
            <button
                onClick={() => signInWithGoogle()}
                className="btn btn-outline w-full"
            >
                Continue With Google
            </button>
        </div>
    );
};

export default SocialLogin;