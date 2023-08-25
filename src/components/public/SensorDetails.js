import React, { useContext, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from "../public/Loading";
import { imgUrl } from "../../hooks/useMyStorage";
import useAdmin from '../../hooks/useAdmin';
import { useQueryFetch } from '../../hooks/useQueryFetch';
import { StateContext } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const SensorDetails = () => {
    const [{ user }] = useContext(StateContext);
    const [text, setText] = useState('');
    const admin = useAdmin();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: sensor, loading, refetch } = useQueryFetch('single-sensor', `${process.env.REACT_APP_Backend_url}/sensor/${id}`, {});
    // console.log(sensor);


    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
        const comment = text.split('\n').join(' ');
        const rating = parseInt(e.target.rating.value) || 5;
        const newComment = { comment, email: user?.email, rating }
        // console.log({newComment,uid:user?.uid});
        const {data:{success}} = await axios.patch(`${process.env.REACT_APP_Backend_url}/comments/${id}/${user?.uid}`,newComment);
        if (success) {
            toast.success('comment send',{theme:'colored'});
        }
        refetch();
        e.target.reset();
        setText('');
    }


    const showStar = (rating)=> {
        let result = [];
        for(let i=0;i<rating;i++){
            result.push(<input type="radio" name="output" readOnly className="mask mask-star-2 w-4 h-4 bg-amber-400" />)
        }
        return result;
    }

    const displayComment = (comment={})=> {
        return Object.values(comment);
    }

    return (
        <div className='h-full min-h-[calc(100vh-132px)] py-10 px-3 mx-auto max-w-[60rem]'>
            {loading && <Loading />}
            <section className='flex flex-wrap justify-center items-center gap-x-10 gap-y-5 p-3'>
                <img src={imgUrl(sensor?.img) || ''} alt="" className='h-auto max-w-sm basis-80 shrink rounded-xl' />

                <article className='p-1 space-y-5 basis-[30rem] shrink text-gray-300'>
                    <h3 className='text-3xl font-bold text-center lg:text-left text-amber-400'>{sensor?.name}</h3>
                    <p className='font-bold text-justify'>{sensor?.details}</p>
                    <div className='space-y-1 text-slate-500'>
                        <h5 className='font-bold'>Available Quantity : {sensor?.availableQuantity}</h5>
                        <h5 className='font-bold'>Minimum Order Quantity : {sensor?.minQuantity}</h5>
                        <h5 className='font-bold'>Price per Unit : {sensor?.unitPrice} BDT</h5>
                    </div>
                    {
                        !admin &&
                        <button
                            onClick={() => {
                                navigate(`/purchase/${sensor?._id}`);
                            }}
                            className='border-2 border-amber-400 px-5 py-1.5 rounded-md font-bold text-amber-400 active:scale-95 hover:bg-amber-400 hover:text-gray-900 transition-colors'>Book Now</button>
                    }
                </article>
            </section>
            <h3 className='text-amber-400 text-2xl font-bold mt-5'>Comments :</h3>
            <div className='my-5 min-h-16 space-y-1 max-h-[13.5rem] overflow-auto'>
                {
                    displayComment(sensor.comments).map((comment,i)=> (
                        <article key={i} className="w-full bg-slate-800 p-3 text-slate-500 font-medium">
                            <h3 className='inline-flex gap-x-3 items-center'>{comment?.email} <span className='rating space-x-0.5'>{showStar(comment.rating)}</span></h3>
                            <h5 className='text-sm text-gray-300 max-h-10 overflow-auto'>{comment?.comment}</h5>
                        </article>))
                }
            </div>
            <form className='relative' onSubmit={handleSubmitComment}>
                <label className='inline-flex gap-x-2 items-center mb-3'>
                    <span className='text-slate-500 font-bold'>Ratings : </span>
                    <div className="rating">
                        <input value={1} type="radio" name="rating" className="mask mask-star-2 bg-green-500" />
                        <input value={2} type="radio" name="rating" className="mask mask-star-2 bg-green-500" />
                        <input value={3} type="radio" name="rating" className="mask mask-star-2 bg-green-500" />
                        <input value={4} type="radio" name="rating" className="mask mask-star-2 bg-green-500" />
                        <input value={5} type="radio" name="rating" className="mask mask-star-2 bg-green-500" />
                    </div>
                </label>
                <textarea onChange={(e)=>setText(e.target.value)} value={text} name='comment' className="h-20 bg-transparent resize-none w-full rounded-xl border-2 border-amber-400 focus:border-2 focus:border-amber-400 focus:outline-none text-amber-400 p-3"></textarea>
                <button type='submit' disabled={!text}>
                    <MdSend className={`absolute right-2 text-amber-400 bottom-4 h-8 w-8 cursor-pointer ${!text && 'cursor-not-allowed'}`} />
                </button>
            </form>
        </div>
    );
};

export default SensorDetails;