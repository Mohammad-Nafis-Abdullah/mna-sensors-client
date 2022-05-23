import React from 'react';

const Card = ({ tool }) => {
    const { name, img, details, unitPrice, minQuantity, availableQuantity } = tool;


    return (
        <div className="card max-w-sm border-2 shrink child-card">
            <figure><img className='h-36' src={img} alt={name} /></figure>
            <div className="card-body -space-y-1">
                <h2 className="card-title">{name}</h2>
                <p className='h-20 text-xs font-medium my-1 overflow-auto shadow'>{details}</p>
                <h3 className='font-medium text-base'>Minimum Quantity : {minQuantity}</h3>
                <h3 className='font-medium text-base'>Available Quantity : {availableQuantity}</h3>
                <h3 className='font-medium text-base'>Price per Unit : ${unitPrice}</h3>
                <div className="card-actions justify-end">
                    <button className="btn">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default Card;