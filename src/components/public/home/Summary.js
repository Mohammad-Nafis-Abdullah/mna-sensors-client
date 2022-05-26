import React from 'react';
import useFetch from '../../../hooks/useFetch';

const Summary = () => {
    const {data:items} = useFetch('http://localhost:5000/sensors',{},'itemsCount');
    const {data:users} = useFetch('http://localhost:5000/users/count',{},'usersCount');
    const {data:orders} = useFetch('http://localhost:5000/orders/count',{},'ordersCount');


    return (
        <section className='flex flex-col items-center justify-center mb-10'>
            <h2 className='font-semibold text-3xl mb-5'>Bussiness Summary</h2>
            <div className="stats stats-vertical lg:stats-horizontal my-shadow">

                <div className="stat">
                    <div className="stat-title">Total Items</div>
                    <div className="stat-value">{items?.length || 0}</div>
                    <div className="stat-desc">In 2022</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">{users?.usersNumber || 0}</div>
                    <div className="stat-desc text-transparent">---</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Total Order</div>
                    <div className="stat-value">{orders?.orders || 0}</div>
                    <div className="stat-desc text-transparent">---</div>
                </div>

            </div>
        </section>
    );
};

export default Summary;