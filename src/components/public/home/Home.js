/* eslint-disable no-unused-vars */
import React from 'react';
import Banner from './Banner';
import Summary from './Summary';
import Reviews from './Reviews';
import CustomCard from './CustomCard';
import { useQueryFetch } from '../../../hooks/useQueryFetch';
import Loading from '../Loading';
import OfficeLocation from './OfficeLocation';

const Home = () => {
    const { data: tools, loading, refetch } = useQueryFetch('all-sensor',`${process.env.REACT_APP_Backend_url}/sensors`);

    return (
        <div className='container'>
            {loading && <Loading/>}
            <Banner />
            <h2 className='font-semibold text-3xl mb-3 mt-5 text-center text-amber-400'>Sensors</h2>
            <div className='flex flex-wrap justify-center gap-5 mb-16 max-w-5xl mx-auto'>
                {
                    tools?.map((tool) => <CustomCard key={tool._id} product={tool} refetch={refetch} />)
                }
            </div>
            <Summary />
            <h2 className='font-semibold text-3xl mb-3 mt-5 text-center text-amber-400'>Reviews</h2>
            <Reviews />
            <h2 className='font-semibold text-3xl mb-3 mt-5 text-center text-amber-400'>Our Offices</h2>
            <OfficeLocation />
        </div>
    );
};

export default Home;