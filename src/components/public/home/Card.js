import React from 'react';

const Card = ({tool}) => {
    const {name,img,details,unitPrice,minQuantity,availableQuantity} = tool;


    return (
        <div class="card glass max-w-sm outline-2 shrink">
            <figure><img className='h-36 ' src={img} alt={name} /></figure>
            <div class="card-body">
                <h2 class="card-title">{name}</h2>
                <p className='h-36 my-1 overflow-auto shadow'>{details}</p>
                <h3 className='font-medium text-lg'>Minimum Quantity : {minQuantity}</h3>
                <h3 className='font-medium text-lg'>Available Quantity : {availableQuantity}</h3>
                <h3 className='font-medium text-lg'>Price per Unit : ${unitPrice}</h3>
                <div class="card-actions justify-end">
                    <button class="btn">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default Card;