import React from 'react';
import Error404 from '../../error.gif'

const NotFound = () => {
    return (
        <div className='fixed top-[72px] right-0 left-0 bottom-[72px] flex justify-center items-center backdrop-blur-3xl'>
            <section className='container'>
                <img className='mx-auto' src={Error404} alt="" />
                <h3 className='text-red-600 animate-pulse text-center font-medium'>Page not Found</h3>
            </section>
        </div>
    );
};

export default NotFound;