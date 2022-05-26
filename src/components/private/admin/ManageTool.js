import React from "react";

const ManageTool = ({ tool, setDeleteTool }) => {
  const { img, name, description, price, minOrderQuantity, availableQuantity } =
    tool;

  return (
    <div className="border-2 rounded-md mb-5 fadeIn mx-auto hover:shadow-[rgba(0,0,0,0.19)_0px_10px_20px,rgba(0,0,0,0.23)_0px_2px_6px] grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 justify-around glass hover:bg-secondary bg-secondary max-w-sm lg:max-w-lg">
      <div className="flex items-center ">
        <img className="rounded-md  h-25 w-60 mx-auto" src={img} alt="" />
      </div>
      <div className="flex flex-col justify-between text-left p-3 m-1 rounded-lg text-white">
        <h2 className="text-xl font-semibold mt-2">{name}</h2>
        <h3 className=" text-sm font-medium">Price: ${price}</h3>
        <h6 className="text-xs">Details: {`${description}`}</h6>
        <h3 className=" text-sm font-medium">
          Minimum Order: {minOrderQuantity} Pieces
        </h3>
        <h3 className=" text-sm font-medium">
          Available Quantity: {availableQuantity} Pieces
        </h3>

        <div>
          <label
            htmlFor="delete-confirm-modal"
            onClick={() => setDeleteTool(tool)}
            className="btn btn-error w-full text-white  mt-2"
          >
            Delete Item
          </label>
        </div>
      </div>
    </div>
  );
};

export default ManageTool;
