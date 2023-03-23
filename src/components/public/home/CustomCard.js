/* eslint-disable no-unused-vars */
import React, { useContext, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { StateContext } from '../../../App';
import auth from '../../../firebase.init';
import useFetch from '../../../hooks/useFetch';
import { imgUrl } from '../../../hooks/useMyStorage';
import { instantModal } from '../../../utilities/Modal';
import ConfigureModal from '../adminComponent/ConfigureModal';
import Loading from '../Loading';


const CustomCard = ({ product, refetch }) => {
    const [state, dispatch] = useContext(StateContext);
    const navigate = useNavigate();
    const childRef = useRef();
    const [user] = useAuthState(auth);
    const { data: { role }, loading } = useFetch(`https://mna-sensors-server.onrender.com/user/${user?.uid}`, {});
    // console.log(role);

    return (
        <div className="slided-card mx-auto rounded-lg">
            {loading && <Loading />}
            <img className="h-full w-full object-cover" src={imgUrl(product.img)} alt={product.name} />
            <div className="btn-div bg-black/70 flex items-center justify-evenly">
                {
                    role === 'admin' ?
                        <button
                            onClick={() => {
                                dispatch({
                                    type: 'configSensor',
                                    value: product,
                                });
                                instantModal(<ConfigureModal ref={childRef} refetch={refetch} />);
                                childRef?.current?.gotoTop();
                            }}
                            className="btn btn-sm font-bold border border-highlight bg-green-400 text-gray-900 hover:bg-green-400 hover:text-gray-900">
                            Configure
                        </button>
                        :
                        <button
                            onClick={() => {
                                navigate(`/purchase/${product._id}`);
                            }}
                            className="btn btn-sm font-bold border border-highlight bg-amber-400 text-[#161b1d] hover:bg-amber-400 hover:text-[#161b1d]">
                            Book Now
                        </button>
                }
                <button className="btn btn-ghost btn-sm font-bold border border-highlight text-amber-400 underline decoration-2 underline-offset-4" onClick={() => {
                    navigate(`/sensor/${product._id}`);
                }}>
                    Detials
                </button>
            </div>

            <div className="card-child bg-black/70">
                <div className="title flex flex-col justify-center items-center">
                    <h2 className="text-xl font-bold text-amber-400">{product.name}</h2>
                    <p className="font-bold text-white text-sm">Price per Unit : {product.unitPrice} BDT</p>
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