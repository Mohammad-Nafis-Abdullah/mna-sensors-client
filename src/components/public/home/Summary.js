import React from 'react';
import useFetching from '../../../hooks/useFetching';

const Summary = () => {
    const items = useFetching('http://localhost:5000/sensors');
    const orders = useFetching('http://localhost:5000/orders/count');


    return (
        <section className='flex flex-col items-center justify-center mb-10'>
            <h2 className='font-semibold text-3xl mb-5'>Bussiness Summary</h2>
            <div className="stats stats-vertical lg:stats-horizontal my-shadow">

                <div className="stat">
                    <div className="stat-title">Total Items</div>
                    <div className="stat-value">{items.length}</div>
                    <div className="stat-desc">In 2022</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">4,200</div>
                    <div className="stat-desc text-transparent">---</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Total Order</div>
                    <div className="stat-value">{orders?.orders}</div>
                    <div className="stat-desc text-transparent">---</div>
                </div>

            </div>
        </section>
    );
};

export default Summary;