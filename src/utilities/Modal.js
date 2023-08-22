import React, { useContext, useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { StateContext } from '../App';


let child, setModalChild;
let checkStatus, setCheckStatus;

/** Modal Component
 * 
 * Add the component at the app.js file just once and enjoy by using it;
 * 
 */
const Modal = () => {
    const [state] = useContext(StateContext);
    [child, setModalChild] = useState(<div/>);
    [checkStatus,setCheckStatus] = useState(false)

    useEffect(()=> {
        if (state.configSensor) {
            setCheckStatus(true);
        } else {
            setCheckStatus(false);
        }
    },[state.configSensor])

    const topDiv = document.getElementById('top');
    topDiv?.scrollIntoView();

    return (
        <>
            <input type="checkbox" className="modal-toggle" checked={checkStatus} readOnly/>
            <div className="modal modal-middle bg-black/80 p-0">
                <button onClick={() => setCheckStatus(false)} className="bg-white flex justify-center items-center text-3xl font-bold text-red-500 h-8 w-8 rounded fixed right-[5%] top-5 cursor-pointer select-none p-1.5 z-[99]"><ImCross/></button>

                <div className='w-full overflow-auto h-screen'>
                    <div id='top' className='h-0 mb-16' />
                    <div className='h-[calc(100%-4rem)] overflow-y-auto'>
                        {child}
                    </div>
                </div>

            </div>
        </>
    );
};

/** Show modal instantly to call the function: instantModal()
 * 
 * Pass any message or component as a parameter of this function; this message or component will show in the modal;
 * 
 * Never use this function direct in button
    [ for example: <button onclick={instantModal}></button> ];
    because onclick event listener of the button pass an event parameter to the function, that will be occured an error;
 * 
 * Rather right a funciton in the onclick event handler of the button and call instantModal function there
    [ for example: <button onclick={()=>{ instantModal() } }></button> ];
 * 
 * The best way is to show modal on button click is, to use ShowModalBtn component as a button;
 * 
 * Use this function (to show modal with mssg ) in a user define function where modal will be needed to show after a certain operation or execution of a certain line of the function;
 * 
*/
const instantModal = ( message_Component='')=> {
    setModalChild(message_Component);
    setCheckStatus(true);
}

const closeModal = ()=> {
    setCheckStatus(false);
}

export default Modal;

export { setModalChild, instantModal, closeModal};