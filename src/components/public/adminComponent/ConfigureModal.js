/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { StateContext } from '../../../App';
import auth from '../../../firebase.init';
import useMyStorage, { imgUrl } from '../../../hooks/useMyStorage';
import { closeModal } from '../../../utilities/Modal';
import Loading from '../Loading';

const ConfigureModal = forwardRef(({ refetch }, ref) => {
    const topRef = useRef();
    const [state] = useContext(StateContext);
    const { _id, name, img, details, unitPrice, availableQuantity, minQuantity } = state?.configSensor;
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [detailsField, setDetailsField] = useState('');
    const [priceField, setPriceField] = useState('');
    const [quantityField, setQuantityField] = useState('');
    const [minOrderField, setMinOrderField] = useState('');
    const [loading, setLoading] = useState(false);
    const { uploadImage, deleteImage } = useMyStorage();

    useEffect(() => {
        topRef.current.scrollIntoView()
        setTitle(name);
        setDetailsField(details);
        setPriceField(unitPrice);
        setQuantityField(availableQuantity);
        setMinOrderField(minQuantity);
    }, [state?.configSensor]);

    useImperativeHandle(ref, () => ({
        gotoTop: () => {
            topRef.current.scrollIntoView()
            setTitle(name);
            setDetailsField(details);
            setPriceField(unitPrice);
            setQuantityField(availableQuantity);
            setMinOrderField(minQuantity);
        },
    }))


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (priceField < 0 || quantityField < 0 || minOrderField < 0) {
            toast.error('Number input field do not accepted any negative value', { theme: 'colored' });
            return;
        }
        if (!title || !detailsField || !priceField || !quantityField || !minOrderField) {
            toast.error('Input field must be unempty', { theme: 'colored' });
            return;
        }

        const sensorInfo = {
            name: title,
            details: detailsField,
            unitPrice: priceField,
            minQuantity: minOrderField,
            availableQuantity: quantityField,
        }

        try {
            if (!image) {
                sensorInfo.img = img;
            } else {
                await deleteImage(img);
                const { name } = await uploadImage(image);
                sensorInfo.img = name;
            }
            const { data } = await axios.put(`${process.env.REACT_APP_Backend_url}/sensor/${_id}`, sensorInfo, {
                headers: {
                    uid: state.user?.uid,
                }
            })
            data?.acknowledged && data?.matchedCount && toast.success('Successfully updated', { theme: 'dark' });
        } catch (err) {
            console.log(err);
        }
        refetch();
        e.target.reset();
        closeModal();
        setLoading(false);
    }

    const handleDelete = async (id) => {
        setLoading(true);
        const header = {
            headers: {
                uid: state.user?.uid,
            },
        };
        try {
            await deleteImage(img);
            const { data } = await axios.delete(`${process.env.REACT_APP_Backend_url}/sensor/${id}`, header);

            if (data.acknowledged) {
                toast.error(`${name} is Deleted Successfully`, { theme: "dark" });
            } else {
                toast.error(`Can't Delete ${name}`, { theme: "colored" });
            }

        } catch (err) {
            toast.error(err, { theme: "colored" });
        }
        closeModal();
        refetch();
        setLoading(false);
    };

    return (
        <div className='max-w-sm h-[95%] bg-white mx-auto rounded-lg overflow-y-auto px-3 py-5 relative'>
            <div ref={topRef} className='w-full absolute top-0' />
            {loading && <Loading />}

            <form onSubmit={handleSubmit} className='flex flex-col gap-y-5'>
                {/* sensor name */}
                <label htmlFor="title" className='space-y-1'>
                    <span className='font-bold'>Title :</span>
                    <input onChange={(e) => setTitle(e.target.value)} id="title" type="text" className='border-2 border-gray-900/50 rounded-md py-1 px-2 w-full text-lg text-gray-600 font-bold min-w-0' value={title} />
                </label>

                {/* sensor image */}
                <label className='space-y-1'>
                    <span className='font-bold'>Previous Image :</span>
                    <img src={imgUrl(img)} alt="" className='max-h-40 h-full mx-auto' />
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" className='border-2 border-gray-900/50 rounded-md py-1 px-2 w-full text-lg text-gray-600 font-bold min-w-0' />
                </label>

                {/* sensor detials */}
                <label htmlFor="details" className='space-y-1'>
                    <span className='font-bold'>Details :</span>
                    <textarea onChange={(e) => setDetailsField(e.target.value)} id="details" className='border-2 border-gray-900/50 rounded-md py-1 px-2 w-full text-gray-600 font-bold min-w-0 h-40 resize-none overflow-y-auto' value={detailsField} />
                </label>

                {/* sensor price */}
                <label htmlFor="price" className='space-y-1'>
                    <span className='font-bold'>Price per Unit (BDT) :</span>
                    <input onChange={(e) => setPriceField(e.target.value)} id="price" type="number" className='border-2 border-gray-900/50 rounded-md py-1 px-2 w-full text-lg text-gray-600 font-bold min-w-0 num' value={priceField} />
                </label>

                {/* sensor quantity */}
                <label htmlFor="quantity" className='space-y-1'>
                    <span className='font-bold'>Available Quantity :</span>
                    <input onChange={(e) => setQuantityField(e.target.value)} id="quantity" type="number" className='border-2 border-gray-900/50 rounded-md py-1 px-2 w-full text-lg text-gray-600 font-bold min-w-0 num' value={quantityField} />
                </label>

                {/* sensor order quantity */}
                <label htmlFor="orderQuantity" className='space-y-1'>
                    <span className='font-bold'>Minimum Order Quantity :</span>
                    <input onChange={(e) => setMinOrderField(e.target.value)} id="orderQuantity" type="number" className='border-2 border-gray-900/50 rounded-md py-1 px-2 w-full text-lg text-gray-600 font-bold min-w-0 num' value={minOrderField} />
                </label>

                <div className='flex gap-x-2'>
                    <input type="submit" value='Update' className='border-2 w-full mt-5 py-2 rounded-lg bg-green-600 text-white font-bold cursor-pointer active:scale-95' />
                    <input onClick={() => handleDelete(_id)} type="button" value='Delete' className='border-2 w-full mt-5 py-2 rounded-lg bg-red-500 text-white font-bold cursor-pointer active:scale-95' />
                </div>
            </form>

        </div>
    );
});

export default ConfigureModal;