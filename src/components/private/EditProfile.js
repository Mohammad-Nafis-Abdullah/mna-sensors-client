/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useMyStorage from '../../hooks/useMyStorage';
import trimError from '../../hooks/trimError';
import { closeModal } from '../../utilities/Modal';
import { StateContext } from '../../App';
import Loading from '../public/Loading';

const EditProfile = () => {
    const [state,dispatch] = useContext(StateContext);
    const [user] = useAuthState(auth);
    const [image,setImage] = useState(undefined);
    const {uploadImage,deleteImage} = useMyStorage();
    const [loading,setLoading] = useState(false);

    const profileUpdating = async (e) => {
        setLoading(true);
        e.preventDefault();

        const name = user.displayName;
        const email = user.email;
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const linkedIn = e.target.linkedIn.value;

        const profile = { name, email, phone, address, linkedIn };
        
        if (!image) {
            profile.img = state?.user?.img;
        }else{
            try {
                await deleteImage(state?.user?.img)
                const {name} = await uploadImage(image);
                profile.img = name;
            } catch (err) {
                toast.error(trimError(err),{theme:'colored'})
            }
        }
        
        try {
            const {data} = await axios.put(`http://localhost:5000/user/${email}`, profile)
            dispatch({
                type:'user',
                value:profile
            });
            data && toast.success('Information Updated', { theme: 'colored' })
            closeModal();
            state.userRefetch();
        } catch (err) {
            toast.error(trimError(err),{theme:'colored'})
        }

        setLoading(false);
        e.target.reset();
    };

    console.log(state);

    return (
        <form onSubmit={profileUpdating} className=' max-w-sm w-full flex flex-col justify-center items-center p-3 rounded-xl gap-0 bg-white mx-auto overflow-y-auto h-full'>
            {loading && <Loading/>}
            <h2 className='mb-5 mt-12 text-2xl font-medium underline'>My Profile</h2>
            <div className="input-container">
                <input type="text" name="name" className="input-field" placeholder={user.displayName} required="" disabled />
                <label className="input-label">Name</label>
            </div>
            <div className="input-container">
                <input type="email" name="email" className="input-field" placeholder={user.email} required="" disabled />
                <label className="input-label">Email address</label>
            </div>
            <div className='input-container'>
                <input onChange={(e)=>setImage(e.target.files ? e.target.files[0] : undefined)} type="file" className="input-field" required accept='.png, .jpg, .jpeg'/>
                <label className="input-label">Profile photo</label>
            </div>
            <div className="input-container">
                <input type="tel" name="phone" className="input-field" placeholder=" " required />
                <label className="input-label">Phone number (required)</label>
            </div>
            <div className="input-container">
                <input type="text" name="address" className="input-field" placeholder=" " required />
                <label className="input-label">Address (required)</label>
            </div>
            <div className="input-container">
                <input type="text" name="linkedIn" className="input-field" placeholder=" " />
                <label className="input-label">LinkedIn</label>
            </div>
            <button type='submit' className="btn btn-outline">Update Profile</button>
        </form>
    );
};

export default EditProfile;