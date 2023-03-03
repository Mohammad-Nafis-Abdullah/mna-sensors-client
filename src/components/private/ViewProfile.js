import React from "react";

const ViewProfile = ({ profile }) => {
  const img = profile?.img || "https://i.ibb.co/pvmWXsv/male-placeholder-image.jpg";


  return (
    <div className="w-full max-w-sm ">
      <div className="border-8 shadow-2xl text-center rounded-xl min-h-0 h-full">
        <h2 className="text-2xl font-bold  underline text-white mt-8">
          My Profile
        </h2>
        <div className="flex justify-center mt-8">
          <div className="flex justify-center items-center w-36 h-36 bg-neutral-focus rounded-full ring-white ring-4 shadow-xl">
            <img className="rounded-full w-32 h-32 object-cover" src={img} alt="" />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-3 ml-3 mt-8">
          <div className=" text-secondary font-semibold w-full text-left rounded-sm">
            <p className="text-white">
              Name :<span className=""> {profile?.name}</span>
            </p>
          </div>
          <div className=" text-secondary font-semibold w-full text-left rounded-sm">
            <p className="text-white">
              Email :<span className=""> {profile?.email}</span>
            </p>
          </div>
          <div className=" text-secondary font-semibold w-full text-left rounded-sm">
            <p className="text-white">
              Address :<span className=""> {profile?.address}</span>
            </p>
          </div>
          <div className=" text-secondary font-semibold w-full text-left rounded-sm">
            <p className="text-white">
              Phone :<span className=""> {profile?.phone}</span>
            </p>
          </div>
          <div className=" text-secondary font-semibold w-full text-left rounded-sm">
            <p className="text-white">
              {" "}
              LinkedIn Profile :
              <small onClick={()=> {
                  window.open(`https://${profile?.linkedIn}`);
              }} className="underline block cursor-pointer">
                <span className="">{profile?.linkedIn}</span>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
