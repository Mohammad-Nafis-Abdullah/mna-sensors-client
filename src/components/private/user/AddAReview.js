import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useFetch from '../../../hooks/useFetch';

const AddAReview = () => {
    const [user] = useAuthState(auth);

    const { data: userReview, refetch } = useFetch(`https://mna-sensors-server.onrender.com/review/${user?.email}`, {})


    const showRating = () => {
        const rate = userReview?.rating;
        let star = '';
        for (let i = 0; i < rate; i++) {
            star += '⭐';
        }
        return star;
    }



    const reviewing = async (e) => {
        e.preventDefault();


        const email = user?.email;
        const comment = e.target.comment.value;
        const activeRating = [...e.target.rating].reverse();

        const rating = parseInt(activeRating.find(rating => rating.checked)?.value) || 5;

        const review = { email, comment, rating };

        await axios.put(`https://mna-sensors-server.onrender.com/review/${email}`, review).then(data => {
            if (data?.data?.success) {
                toast.success('Review submitted successfully', { theme: 'colored' })
            }
            if (data?.data?.update) {
                toast.success('Review updated successfully', { theme: 'dark' })
            }
        });
        refetch();
        showRating();
        e.target.comment.value = '';
    }



    return (
        <div className='flex flex-wrap justify-center gap-5 '>
            <form onSubmit={reviewing} className="form-control ring-4 rounded ring-white p-2 space-y-2 max-w-sm">
                <h2 className='text-white font-medium text-2xl underline text-center mb-5'>Add a Review</h2>
                <label className="input-group max-w-sm w-full">
                    <span className='font-medium text-neutral-focus'>Email:</span>
                    <input type="text" placeholder={user?.email} className="input input-bordered placeholder:text-neutral-focus font-medium text-lg w-auto min-w-0" readOnly />
                </label>
                <label htmlFor="">
                    <textarea className="textarea textarea-bordered max-w-sm w-full text-base placeholder:text-neutral-focus text-neutral-focus font-medium" name='comment' placeholder="Comment" required></textarea>
                </label>
                <label htmlFor="" className='flex items-center'>
                    <span className='font-medium text-lg text-white'>Ratings :</span>
                    <div className="rating">
                        <input type="radio" name="rating" className="mask mask-star-2 bg-orange-400" value='1' />
                        <input type="radio" name="rating" className="mask mask-star-2 bg-orange-400" value='2' />
                        <input type="radio" name="rating" className="mask mask-star-2 bg-orange-400" value='3' />
                        <input type="radio" name="rating" className="mask mask-star-2 bg-orange-400" value='4' />
                        <input type="radio" name="rating" className="mask mask-star-2 bg-orange-400" value='5' />
                    </div>
                </label>
                <button type='submit' className="btn btn-outline text-white hover:text-neutral-focus hover:bg-white">
                    submit review
                </button>
            </form>
            <section className='max-w-sm w-full p-2 ring-4 ring-white rounded  max-h-[334px]'>
                <div className='bg-white font-medium text-neutral-focus p-3 rounded h-full flex flex-col justify-between'>
                    <p className='text-lg underline'>Submitted Review : </p>
                    <small className='text-red-600'>{userReview?.comment ? '' : 'No review is submitted'}</small>
                    <p className='h-36 overflow-auto p-1 rounded text-gray-800/70'><span className='text-neutral-focus'>Comment :</span><br />{userReview?.comment}</p>
                    <p className='py-1 px-3 bg-neutral-focus text-white rounded'>Rating : {showRating()}</p>
                </div>
            </section>
        </div>
    );
};

export default AddAReview;