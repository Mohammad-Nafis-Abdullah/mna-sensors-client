/* eslint-disable no-unused-vars */
import { BadgeCheckIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useFetch from '../../../hooks/useFetch';

const Purchase = () => {
    const [user] = useAuthState(auth);
    // console.log(user);
    const params = useParams();
    const { id: serviceId } = params;
    let selected = [];
    const { myData: select, refetch } = useFetch(`http://localhost:5000/sensor/${serviceId}`);
    if(select){
        selected = select[0];
    }


    const checkedOut = (e) => {
        e.preventDefault();
        e.target.email.value = '';
        e.target.name.value = '';
        e.target.phone.value = '';
        e.target.address.value = '';

        selected ? toast('Thanks for checking out our service') : alert('No service selected');
    }

    const [quantity, setQuantity] = useState(0);
    const quantifing = (e) => {
        const inputValue = parseInt(e.target.value);
        setQuantity(inputValue);
    };
    const checkQuantity = (e) => {
        const inputValue = parseInt(e.target.value);
        if (inputValue < selected.minQuantity || inputValue > selected.availableQuantity) {
            setQuantity(selected.minQuantity);
        }

    }

    return (
        <div className='container min-h-[calc(100vh-166.5px)] flex flex-wrap justify-center items-center px-3 py-8 gap-8'>
            <form onSubmit={checkedOut} className='max-w-sm p-5 rounded-xl shadow-[0_0_15px_1px_rgba(0,0,0,0.343)] w-full fromLeft'>
                <h3 className='text-center mb-10 text-gray-800 font-medium text-3xl'>Purchase Form</h3>
                <div className="input-container">
                    <input type="text" name="name" className="input-field" placeholder={user.displayName} required="" disabled />
                    <label className="input-label">Name</label>
                </div>
                <div className="input-container">
                    <input type="email" name="email" className="input-field" placeholder={user.email} required="" disabled />
                    <label className="input-label">Email address</label>
                </div>
                <div className="input-container">
                    <input type="tel" name="phone" className="input-field" placeholder=" " required="" />
                    <label className="input-label">Phone number</label>
                </div>
                <div className="input-container">
                    <input type="text" name="address" className="input-field" placeholder=" " required="" />
                    <label className="input-label">Address</label>
                </div>
                {
                    selected ?
                        <div className='max-w-sm w-full flex flex-col justify-center items-center p-3 shadow-[0_0_15px_1px_rgba(0,0,0,0.343)] rounded-xl gap-3'>
                            <img className='h-28 w-36 object-cover rounded-md' src={selected.img} alt="" />
                            <div className='text-center font-medium space-y-3 grow'>
                                <h5 className='text-gray-800 text-left text-xl'>{selected.name}</h5>
                                <div className="input-container">
                                    <label htmlFor="" className='flex justify-between items-center gap-2 text-lg'>Price per unit :<input type="text" className="input-field basis-1/2 text-center" placeholder={`$ ${selected.unitPrice}`} disabled /></label>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="" className='flex justify-between items-center gap-2 text-lg'>Minimum Order :<input type="text" className="input-field basis-1/2 text-center" placeholder={selected.minQuantity} disabled /></label>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="" className='flex justify-between items-center gap-2 text-lg'>Quantity :<input type="number" className="input-field basis-1/2 text-center text-xl font-medium" placeholder='' required=" " onBlur={checkQuantity} onChange={quantifing} value={quantity || selected.minQuantity} /></label>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="" className='flex justify-between items-center gap-2 text-lg'>Total Available :<input type="text" className="input-field basis-1/2 text-center" placeholder={selected.availableQuantity} disabled /></label>
                                </div>
                            </div>
                        </div> :
                        <div className="alert alert-error shadow-lg">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span className='uppercase'>error! product not found.</span>
                            </div>
                        </div>
                }
                <button type='submit' className="block mt-10 mx-auto px-16 py-1.5 rounded-md text-gray-800 font-medium
                hover:text-white hover:bg-gray-800 border-2 border-gray-800 duration-150 active:scale-95">Order</button>
            </form>
        </div>
    );
};

export default Purchase;