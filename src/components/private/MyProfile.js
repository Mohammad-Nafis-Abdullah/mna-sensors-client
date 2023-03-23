/* eslint-disable no-unused-vars */
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useFetch from '../../hooks/useFetch';
import ViewProfile from './ViewProfile'

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const { data: profile, refetch } = useFetch(`https://mna-sensors-server.onrender.com/user/${user?.uid}`, {});


    return (
        <div className='flex justify-center py-5 gap-5 flex-wrap'>
            <ViewProfile key={profile?._id} profile={profile} refetch={refetch} />
        </div>
    );
};

export default MyProfile;