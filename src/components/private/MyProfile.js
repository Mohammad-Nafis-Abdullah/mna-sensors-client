import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const MyProfile = () => {
    const [user] = useAuthState(auth);



    const profileUpdating = async (e)=> {
        e.preventDefault();

        const name = user.displayName;
        const email = user.email;
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const linkedIn = e.target.linkedIn.value;

        const profile = {name,email,phone,address,linkedIn};

        await axios.put(`http://localhost:5000/user/${email}`, profile).then((data) => {
            if (data) {
                toast.success('Information Updated',{theme:'colored'})
            }
        });

        e.target.phone.value='';
        e.target.address.value='';
        e.target.linkedIn.value='';
    }


    return (
        <div className='flex justify-center items-center'>
            <form onSubmit={profileUpdating} className='fromRight max-w-sm w-full flex flex-col justify-center items-center p-3 rounded-xl gap-0 bg-white my-5 mx-1'>
                    <h2 className='mb-5 text-2xl font-medium underline'>My Profile</h2>
                    <div className="input-container">
                        <input type="text" name="name" className="input-field" placeholder={user.displayName} required="" disabled />
                        <label className="input-label">Name</label>
                    </div>
                    <div className="input-container">
                        <input type="email" name="email" className="input-field" placeholder={user.email} required="" disabled />
                        <label className="input-label">Email address</label>
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
        </div>
    );
};

export default MyProfile;