import React from 'react';

const Card = ({tool}) => {
    const {name,img,details,unitPrice,minQuantity,availableQuantity} = tool;


    return (
        <div class="card glass max-w-sm outline-2 shrink child-card">
            <figure><img className='h-36' src={img} alt={name} /></figure>
            <div class="card-body -space-y-1">
                <h2 class="card-title">{name}</h2>
                <p className='h-20 text-xs font-medium my-1 overflow-auto shadow'>{details}</p>
                <h3 className='font-medium text-base'>Minimum Quantity : {minQuantity}</h3>
                <h3 className='font-medium text-base'>Available Quantity : {availableQuantity}</h3>
                <h3 className='font-medium text-base'>Price per Unit : ${unitPrice}</h3>
                <div class="card-actions justify-end">
                    <button class="btn">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default Card;