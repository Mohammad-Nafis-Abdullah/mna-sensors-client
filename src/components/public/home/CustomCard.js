import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomCard = ({product}) => {
    const navigate = useNavigate();

    return (
        <div className="slided-card mx-auto rounded-lg">
            {/* {adminLoading && <Loading />} */}
            <img className="h-full w-full object-cover" src={product.img} alt={product.name} />
            <div className="btn-div bg-black/70">
                <button
                    onClick={()=> {
                        navigate(`/purchase/${product._id}`)
                    }}
                    className="btn btn-wide font-bold border border-highlight bg-amber-400 text-[#161b1d] hover:bg-amber-400 hover:text-[#161b1d]">
                    Book Now
                </button>
                {/* {
                    admin ?
                        <button className={'btn btn-error flex justify-center items-center'} onClick={() => {
                        }}>
                            Configure
                        </button> :
                        <button
                            onClick={() => {
                            }}
                            className="btn btn-wide font-bold border border-highlight bg-[#161b1d] text-highlight hover:bg-highlight hover:text-[#161b1d]"
                        >
                            Book Now
                        </button>
                } */}
            </div>

            <div className="card-child bg-black/70">
                <div className="title flex flex-col justify-center items-center">
                    <h2 className="text-xl font-bold text-amber-400">{product.name}</h2>
                    <p className="font-bold text-white text-sm">Price per Unit : ${product.unitPrice}</p>
                </div>
                <div className="body p-3 space-y-3 text-white ">
                    <p className='h-20 text-xs font-medium my-1 overflow-auto shadow'>{product.details}</p>
                    <h3 className='font-medium text-base'>Minimum Quantity : {product.minQuantity}</h3>
                    <h3 className='font-medium text-base'>Available Quantity : {product.availableQuantity}</h3>
                </div>
            </div>
        </div>
    );
};

export default CustomCard;