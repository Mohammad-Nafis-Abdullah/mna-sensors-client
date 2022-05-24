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

        const name = user.displayName;
        const email = user.email;
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const orderDetails = [
            {
                productId: selected._id,
                productName: selected.name,
                orderQuantity : quantity || selected.minQuantity,
                orderCost : quantity*selected.unitPrice || selected.minQuantity*selected.unitPrice
            }
        ]

        // const orderQuantity = quantity || selected.minQuantity;
        // const orderCost = quantity*selected.unitPrice || selected.minQuantity*selected.unitPrice;

        const order = {name,email,phone,address,orderDetails}
        console.log(order);

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
            <form onSubmit={checkedOut} className='p-5 rounded-xl shadow-[0_0_15px_1px_rgba(0,0,0,0.343)] flex flex-wrap justify-center items-center gap-x-16 gap-y-5'>
                <h3 className='text-center text-gray-800 font-medium text-3xl basis-full'>Purchase Form</h3>
                <section className='fromLeft max-w-sm w-full flex flex-col justify-center items-center p-3 rounded-xl gap-3'>
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
                        <div className='max-w-sm w-full flex flex-col justify-center items-center p-3 shadow-[0_0_15px_1px_rgba(0,0,0,0.343)] rounded-xl gap-3 fromRight'>
                            <img className='h-28 w-36 object-cover rounded-md' src={selected.img} alt="" />
                            <div className='text-center font-medium space-y-3 grow'>
                                <h5 className='text-gray-800 text-left text-xl'>{selected.name}</h5>
                                <div className="input-container">
                                    <label htmlFor="" className='flex justify-between items-center gap-2 text-sm sm:text-lg'>Price per unit :<input type="number" className="input-field basis-1/2 text-center" placeholder={`$ ${selected.unitPrice}`} disabled /></label>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="" className='flex justify-between items-center gap-2 text-sm sm:text-lg'>Minimum Order :<input type="number" className="input-field basis-1/2 text-center" placeholder={selected.minQuantity} disabled /></label>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="" className='flex justify-between items-center gap-2 text-sm sm:text-lg'>Quantity :<input type="number" className="input-field basis-1/2 text-center text-xl font-medium" placeholder='' required=" " onBlur={checkQuantity} onChange={quantifing} value={quantity || selected.minQuantity} /></label>
                                    {
                                        (quantity<selected.minQuantity || quantity>selected.availableQuantity) && <small className='text-red-600'>{`Enter quantity between ${selected.minQuantity} to ${selected.availableQuantity}`}</small>
                                    }
                                </div>
                                <div className="input-container">
                                    <label htmlFor="" className='flex justify-between items-center gap-2 text-sm sm:text-lg'>Total Cost :<input type="number" className="input-field basis-1/2 text-center" placeholder={`$ ${quantity*selected.unitPrice || selected.minQuantity*selected.unitPrice}`} disabled /></label>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="" className='flex justify-between items-center gap-2 text-sm sm:text-lg'>Total Available :<input type="number" className="input-field basis-1/2 text-center" placeholder={selected.availableQuantity} disabled /></label>
                                </div>
                            </div>
                        </div>
                }
                <div className='basis-full'>
                    <button type='submit' className="block mx-auto px-16 py-1.5 rounded-md text-gray-800 font-medium
                hover:text-white hover:bg-gray-800 border-2 border-gray-800 duration-150 active:scale-95">Order</button>
                </div>
            </form>
        </div>
    );
};

export default Purchase;