import React from 'react';
import useFetch from '../../../hooks/useFetch';

const Reviews = () => {
    const { data: allreviews } = useFetch('https://cryptic-tor-95332.herokuapp.com/reviews', {}, 'reviews');
    const reviews = allreviews?.slice(0, 3);

    return (
        <div className='mb-8 container p-3 flex flex-wrap justify-center gap-5'>
            {
                allreviews?.length &&
                reviews?.map((review) => {
                    const showRating = () => {
                        const rate = review?.rating;
                        let star = '';
                        for (let i = 0; i < rate; i++) {
                            star += '⭐';
                        }
                        return star;
                    }
                    // console.log(review);
                    return (
                        <div key={review?._id} className="max-w-xs w-full rounded-xl p-3 text-neutral-focus ring-4 ring-neutral-focus font-medium">
                            <h3 className=''>Email: {review?.email}</h3>
                            <h4>Comment : </h4>
                            <h5 className='text-sm text-gray-800/80 h-20 overflow-auto'>{review?.comment}</h5>
                            <p className='py-1 px-3 bg-neutral-focus text-white inline-block rounded'>Rating : {showRating()}</p>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Reviews;