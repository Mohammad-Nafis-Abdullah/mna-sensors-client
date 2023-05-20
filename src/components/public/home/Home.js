/* eslint-disable no-unused-vars */
import React from 'react';
import Banner from './Banner';
import useFetch from '../../../hooks/useFetch'
import Summary from './Summary';
import Reviews from './Reviews';
import Extra from './Extra';
import CustomCard from './CustomCard';

const Home = () => {


    const { data: tools, refetch } = useFetch(`${process.env.REACT_APP_Backend_url}/sensors`);

    return (
        <div className='container'>
            <Banner />
            <h2 className='font-semibold text-3xl mb-3 mt-5 text-center'>Sensors</h2>
            <div className='flex flex-wrap justify-center gap-5 mb-16 max-w-5xl mx-auto'>
                {
                    tools?.map((tool) => <CustomCard key={tool._id} product={tool} refetch={refetch} />)
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