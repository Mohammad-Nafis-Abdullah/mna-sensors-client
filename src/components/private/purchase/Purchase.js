/* eslint-disable no-unused-vars */
import axios from 'axios';
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
    const { data: select, refetch } = useFetch(`http://localhost:5000/sensor/${serviceId}`, {});
    if (select) {
        selected = select[0];
    }


    const ordering = async (e) => {
        e.preventDefault();

        const name = user.displayName;
        const email = user.email;
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const productId = selected._id;
        const productName = selected.name;
        const orderQuantity = quantity || selected.minQuantity;
        const orderCost = quantity ? parseFloat((quantity * selected.unitPrice).toFixed(2)) : parseFloat((selected.minQuantity * selected.unitPrice).toFixed(2));


        const order = { name, email, phone, address, productId, productName, orderQuantity, orderCost };

        await axios.post('http://localhost:5000/order', order).then(res => {
            toast.success(`${orderQuantity} pieces of ${productName} ordered successfully`, { theme: 'colored' });
        });

        const remaniningQuantity = selected.availableQuantity - orderQuantity;
        const updateQuantity = { remaniningQuantity };
        await axios.put(`http://localhost:5000/sensor/${selected._id}`, updateQuantity).then((res) => {
            if (res) {
                refetch();
            }
        });


        e.target.phone.value = '';
        e.target.address.value = '';

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
        <div className='container min-h-[calc(100vh-166.5px)] flex flex-wrap justify-center items-center px-3 py-1 gap-8'>
            <form onSubmit={ordering} className='p-5 rounded-xl my-shadow flex flex-wrap justify-center items-center gap-x-16 gap-y-5 bg-gray-700'>
                <h3 className='text-center text-white font-medium text-3xl basis-full'>Purchase Form</h3>
                <section className=' max-w-sm w-full flex flex-col justify-center items-center p-3 rounded-xl gap-3 bg-white pt-10'>
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
                        <label className="input-label">Phone number</label>
                    </div>
                    <div className="input-container">
                        <input type="text" name="address" className="input-field" placeholder=" " required />
                        <label className="input-label">Address</label>
                    </div>
                </section>
                {
                    selected &&
                    <div className='max-w-sm w-full flex flex-col justify-center items-center p-3 my-shadow rounded-xl  bg-white'>
                        <img className='h-[6.8rem] w-36 object-cover rounded-md' src={selected.img} alt="" />
                        <div className='text-center font-medium space-y-3 grow'>
                            <h5 className='text-gray-800 text-left text-xl'>{selected.name}</h5>
                            <div className="input-container">
                                <label htmlFor="" className='flex justify-between items-center gap-2 text-sm text-gray-900/70 sm:text-lg'>Price per unit :<input type="number" className="input-field px-0 py-0 basis-1/2 text-center" placeholder={`BDT ${selected.unitPrice}`} disabled /></label>
                            </div>
                            <div className="input-container">
                                <label htmlFor="" className='flex justify-between items-center gap-2 text-sm text-gray-900/70 sm:text-lg'>Minimum Order :<input type="number" className="input-field px-0 py-0  basis-1/2 text-center" placeholder={selected.minQuantity} disabled /></label>
                            </div>
                            <div className="input-container">
                                <label
                                    htmlFor=""
                                    className='flex justify-between items-center gap-2 text-sm text-gray-900/70 sm:text-lg'>
                                    Quantity :
                                    <input
                                        type="number"
                                        className="input-field px-0 py-0  basis-1/2 text-center text-xl font-medium"
                                        required
                                        onBlur={checkQuantity}
                                        onChange={quantifing}
                                        value={quantity || selected.minQuantity} /></label>
                                {
                                    (quantity < selected.minQuantity || quantity > selected.availableQuantity) && <small className='text-red-600'>{`Enter quantity between ${selected.minQuantity} to ${selected.availableQuantity}`}</small>
                                }
                            </div>
                            <div className="input-container">
                                <label htmlFor="" className='flex justify-between items-center gap-2 text-sm text-gray-900/70 sm:text-lg'>Total Cost :<input type="number" className="input-field px-0 py-0  basis-1/2 text-center" placeholder={`BDT ${quantity ? (quantity * selected.unitPrice).toFixed(2) : (selected.minQuantity * selected.unitPrice).toFixed(2)}`} disabled /></label>
                            </div>
                            <div className="input-container">
                                <label htmlFor="" className='flex justify-between items-center gap-2 text-sm text-gray-900/70 sm:text-lg'>Total Available :<input type="number" className="input-field px-0 py-0  basis-1/2 text-center" placeholder={selected.availableQuantity} disabled /></label>
                            </div>
                        </div>
                    </div>
                }
                <div className='basis-full'>
                    <button type='submit' className="block mx-auto px-16 py-1.5 rounded-md text-white font-bold
                hover:text-gray-800 hover:bg-white border-[4px] border-white duration-150 active:scale-95">Order</button>
                </div>
            </form>
        </div>
    );
};

export default Purchase;