import React from 'react';

const Banner = () => {

    return (
        <>
            <div class="carousel w-full h-[26rem] container mt-1">
                <div id="slide1" class="carousel-item relative w-full">
                    <img src="https://admin.techshopbd.com/uploads/product/Grove-AlcoholSensor.jpg" class="h-full mx-auto object-cover" alt='' />
                        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide3" class="btn btn-circle">❮</a>
                            <a href="#slide2" class="btn btn-circle">❯</a>
                        </div>
                </div>
                <div id="slide2" class="carousel-item relative w-full">
                    <img src="https://admin.techshopbd.com/uploads/product/IRObstacleSensor_1.jpg" class="h-full mx-auto object-cover" alt='' /> 
                        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide1" class="btn btn-circle">❮</a>
                            <a href="#slide3" class="btn btn-circle">❯</a>
                        </div>
                </div>
                <div id="slide3" class="carousel-item relative w-full">
                    <img src="https://admin.techshopbd.com/uploads/product/LaserSensor.jpg" class="h-full mx-auto object-cover" alt='' />
                        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide2" class="btn btn-circle">❮</a>
                            <a href="#slide1" class="btn btn-circle">❯</a>
                        </div>
                </div>
            </div>
        </>
    );
};

export default Banner;