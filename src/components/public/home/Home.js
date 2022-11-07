/* eslint-disable no-unused-vars */
import React from 'react';
import Banner from './Banner';
import useFetch from '../../../hooks/useFetch'
import Card from './Card';
import Summary from './Summary';
import Reviews from './Reviews';
import Extra from './Extra';

const Home = () => {


    const { data: tools, refetch } = useFetch('https://mna-sensors-server.onrender.com/sensors');

    return (
        <div className='container'>
            <Banner />
            <h2 className='font-semibold text-3xl mb-3 mt-5 text-center'>Sensors</h2>
            <div className='flex flex-wrap justify-center gap-5 mb-16'>
                {
                    tools?.map((tool) => <Card key={tool._id} tool={tool} />)
                }
            </div>
            <Summary />
            <h2 className='font-semibold text-3xl mb-3 mt-5 text-center'>Reviews</h2>
            <Reviews />
            <h2 className='font-semibold text-3xl mb-3 mt-5 text-center'>Our Offices</h2>
            <Extra />
        </div>
    );
};

export default Home;