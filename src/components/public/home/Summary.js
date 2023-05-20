import React from 'react';
import { useQueryFetch } from '../../../hooks/useQueryFetch';

const Summary = () => {
    const { data: items } = useQueryFetch('all-sensor',`${process.env.REACT_APP_Backend_url}/sensors`, []);
    const { data: users } = useQueryFetch('user-count',`${process.env.REACT_APP_Backend_url}/users/count`, {});
    const { data: orders } = useQueryFetch('order-count',`${process.env.REACT_APP_Backend_url}/orders/count`, {});


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