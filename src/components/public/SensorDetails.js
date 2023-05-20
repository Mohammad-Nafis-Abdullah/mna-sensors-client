import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import Loading from "../public/Loading";
import { imgUrl } from "../../hooks/useMyStorage";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const SensorDetails = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: { role }, userLoading } = useFetch(`${process.env.REACT_APP_Backend_url}/user/${user?.uid}`, {});
    const { data: sensor, loading } = useFetch(`${process.env.REACT_APP_Backend_url}/sensor/${id}`, {});
    // console.log(sensor);

    return (
        <div className='h-full min-h-[calc(100vh-144px)] flex justify-center items-center'>
            {(loading || userLoading) && <Loading />}
            <section className='flex flex-wrap justify-center items-center gap-x-10 gap-y-5 p-3'>
                <img src={imgUrl(sensor?.img)} alt="" className='h-auto max-w-sm basis-80 shrink' />

                <article className='p-1 space-y-5 basis-[32rem] shrink'>
                    <h3 className='text-xl font-bold text-gray-900 text-center lg:text-left'>{sensor?.name}</h3>
                    <p className='text-gray-500 font-bold text-justify'>{sensor?.details}</p>
                    <div className='space-y-1'>
                        <h5 className='font-bold'>Available Quantity : {sensor?.availableQuantity}</h5>
                        <h5 className='font-bold'>Minimum Order Quantity : {sensor?.minQuantity}</h5>
                        <h5 className='font-bold'>Price per Unit : {sensor?.unitPrice} BDT</h5>
                    </div>
                    {
                        role !== 'admin' &&
                        <button
                            onClick={() => {
                                navigate(`/purchase/${sensor?._id}`);
                            }}
                            className='bg-gray-900/90 px-5 py-1.5 rounded-md font-bold text-amber-400 active:scale-95 hover:bg-gray-900 transition-colors'>Book Now</button>
                    }
                </article>

            </section>
        </div>
    );
};

export default SensorDetails;