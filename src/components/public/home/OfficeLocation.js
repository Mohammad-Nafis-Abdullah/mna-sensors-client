import React from 'react';

const OfficeLocation = () => {
    return (
        <div className='justify-center pb-10 space-y-3'>

            <div className='rounded p-3 flex flex-wrap gap-x-10 gap-y-5 justify-center'>
                <img src="https://i.pinimg.com/originals/f1/13/90/f113905fe574931e323146cbf829edc1.jpg" alt="" className='max-w-sm w-full h-60 object-cover object-top rounded' />
                <div className='max-w-sm w-full'>
                    <h3 className='text-xl text-gray-300 font-medium my-3 uppercase'>Chittagong Office :</h3>
                    <p className='text-lg font-medium text-slate-500 underline decoration-2'>Address :</p><address className='text-lg font-medium text-slate-500 no-underline'>Lane No. 02, Road No. 01, K-Block R/A, Halishahar, Chittagong</address>
                </div>
            </div>


            <div className='rounded p-3 flex flex-wrap-reverse justify-center gap-x-10 gap-y-5'>
                <div className='max-w-sm w-full'>
                    <h3 className='text-xl text-gray-300 font-medium my-3 uppercase'>Dhaka Office :</h3>
                    <p className='text-lg font-medium text-slate-500 underline decoration-2'>Address :</p><address className='text-lg font-medium text-slate-500 no-underline'>14/a, Road No. 05, Elephant Road, Dhaka</address>
                </div>
                <img src="https://statemag.state.gov/wp-content/uploads/2021/02/0321POM-29.jpg" alt="" className='max-w-sm w-full h-60 object-cover object-top rounded' />
            </div>

        </div>
    );
};

export default OfficeLocation;