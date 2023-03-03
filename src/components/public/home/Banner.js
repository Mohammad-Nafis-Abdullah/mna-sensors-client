/* eslint-disable no-unused-vars */
import React from 'react';
import Slider from 'react-slick';
import useRefetch from '../../../hooks/useRefetch';

const Banner = () => {
    const [banner,loading,refetch] = useRefetch('banner-bg.json');

    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        autoplay:true,
        swipeToSlide:false,
        pauseOnHover:false,
        speed: 1000,
        autoplaySpeed:4000,
        arrows:false,
        className:'max-w-5xl mx-auto py-5',
    };

    return (
        <div>
            <Slider {...settings}>
                {
                    banner.map(banner=>{
                        return <img className='h-[calc(100vh-6.25rem)] object-cover' key={banner._id} src={banner.img} alt='' />
                    })
                }
            </Slider>
        </div>
    );
};

export default Banner;