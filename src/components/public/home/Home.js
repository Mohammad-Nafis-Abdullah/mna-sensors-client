import React from 'react';
import Banner from './Banner';
import useFetch from '../../../hooks/useFetch'
import Card from './Card';

const Home = () => {
    

    const {myData:tools,refetch} = useFetch('http://localhost:5000/sensors');

    console.log(tools);


    return (
        <div className='container'>
            <Banner/>
            <h2 className='text-3xl font-medium underline text-center mt-10 mb-8'>Sensors</h2>
            <div className='flex flex-wrap justify-center gap-5 mb-16'>
                {
                    tools?.map((tool) => <Card key={tool._id} tool={tool} refetch={refetch}/>)
                }
            </div>
        </div>
    );
};

export default Home;