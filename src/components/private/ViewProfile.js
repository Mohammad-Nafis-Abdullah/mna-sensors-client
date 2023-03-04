/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { FaEdit } from 'react-icons/fa';
import { instantModal } from "../../utilities/Modal";
import EditProfile from "./EditProfile";
import { StateContext } from "../../App";
import { imgUrl } from "../../hooks/useMyStorage";


const ViewProfile = ({ profile,refetch }) => {
  const [state,dispatch] = useContext(StateContext);
  const img = imgUrl(profile?.img) || "https://i.ibb.co/pvmWXsv/male-placeholder-image.jpg";

  useEffect(() => {
    if (profile?.img !== state?.userImg) {
      dispatch({ type: 'userImg', value: profile?.img });
    }
  }, [profile]);

  return (
    <div className="text-center min-h- h-full w-full max-w-sm rounded-lg relative">
      <FaEdit onClick={()=> {
          instantModal(<EditProfile userProfile={profile} refetch={refetch}/>);
      }} className="text-amber-400 w-8 h-8 absolute top-0 right-0 cursor-pointer"/>
      <h2 className="text-2xl font-bold underline text-white">
        My Profile
      </h2>
      <div className="flex justify-center mt-8">
        <div className="flex justify-center items-center w-36 h-36 bg-neutral-focus rounded-full ring-amber-400 ring-4 shadow-xl">
          <img className="rounded-full w-32 h-32 object-scale-down" src={img} alt="" />
        </div>
      </div>
      <div className="flex flex-col justify-center p-3 gap-y-6">
        <article className="text-amber-400">
          <h3 className="text-xl font-bold"> {profile?.name}</h3>
          <h4 className=""> <span onClick={() => {
            navigator.clipboard.writeText(profile?.email).then(() => {
              toast.success('Email Coppied to Clipboard', { theme: 'dark' });
            });
          }} className="underline underline-offset-4 decoration-2 cursor-pointer" title="Click to copy email">{profile?.email}</span></h4>
        </article>
        <article className="text-white text-left space-y-3">
          
          <div className="form-control">
            <label className="input-group input-group-md">
              <span className="text-gray-800 font-bold max-w-[5rem] w-full">Address</span>
              <input type="text" placeholder="Type here" value={profile?.address} className="input input-bordered input-md bg-transparent border-2 border-white whitespace-pre-wrap min-w-0 max-w-none w-full" readOnly/>
            </label>
          </div>

          <div className="form-control">
            <label className="input-group input-group-md">
              <span className="text-gray-800 font-bold max-w-[5rem] w-full">Phone</span>
              <input type="text" placeholder="Type here" value={profile?.phone} className="input input-bordered input-md bg-transparent border-2 border-white whitespace-pre-wrap min-w-0 max-w-none w-full" readOnly/>
            </label>
          </div>
          
          <div className="form-control">
            <label className="input-group input-group-md">
              <span className="text-gray-800 font-bold max-w-[5rem] w-full">Linkedin</span>
              <input type="text" placeholder="Type here" value={profile?.linkedIn} className="input input-bordered input-md bg-transparent border-2 border-white whitespace-pre-wrap min-w-0 max-w-none w-full underline cursor-pointer font-bold text-amber-400" onClick={() => {
              window.open(`https://${profile?.linkedIn}`);
            }} readOnly/>
            </label>
          </div>

        </article>
      </div>
    </div>
  );
};

export default ViewProfile;
