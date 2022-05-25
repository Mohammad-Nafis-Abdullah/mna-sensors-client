/* eslint-disable no-unused-vars */
import React from 'react';
import Banner from './Banner';
import useFetch from '../../../hooks/useFetch'
import Card from './Card';
import Summary from './Summary';

const Home = () => {
    

    const {data:tools,refetch} = useFetch('http://localhost:5000/sensors');

    return (
        <div className='container'>
            <Banner/>
            <h2 className='text-3xl font-medium underline text-center mt-10 mb-8'>Sensors</h2>
            <div className='flex flex-wrap justify-center gap-5 mb-16'>
                {
                    tools?.map((tool) => <Card key={tool._id} tool={tool} />)
                }
            </div>
            <Summary/>
        </div>
    );
};

export default Home;