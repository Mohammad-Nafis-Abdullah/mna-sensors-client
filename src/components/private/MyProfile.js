/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useFetch from '../../hooks/useFetch';
import ViewProfile from './ViewProfile'

const MyProfile = () => {
    const [user] = useAuthState(auth);

    const { data: profile, refetch } = useFetch(`http://localhost:5000/user/${user?.email}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });


    return (
        <div className='flex justify-center my-5 gap-5 flex-wrap'>
            <ViewProfile key={profile?._id} profile={profile} refetch={refetch}/>
        </div>
    );
};

export default MyProfile;