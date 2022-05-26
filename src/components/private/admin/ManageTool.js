import React from "react";

const ManageTool = ({ tool, setDeleteTool }) => {
  const { img, name, details, unitPrice, minQuantity, availableQuantity } =
    tool;

  return (
    <div className="border-2 rounded-md fadeIn justify-around bg-white max-w-xs">
      <div className="flex items-center ">
        <img className="rounded-md w-40 object-cover mx-auto" src={img} alt="" />
      </div>
      <div className="flex flex-col justify-center gap-1 text-left p-3 rounded-lg text-neutral-focus">
        <h2 className="text-xl font-semibold mt-2">{name}</h2>
        <h3 className=" text-sm font-medium">Price: ${unitPrice}</h3>
        <h6 className="text-xs h-20 overflow-auto">Details: {`${details}`}</h6>
        <h3 className=" text-sm font-medium">
          Minimum Order: {minQuantity} Pieces
        </h3>
        <h3 className=" text-sm font-medium">
          Available Quantity: {availableQuantity} Pieces
        </h3>

        <div>
          <label
            htmlFor="delete-confirm-modal"
            onClick={() => setDeleteTool(tool)}
            className="btn btn-error border-none w-full text-white  mt-2"
          >
            Delete Item
          </label>
        </div>
      </div>
    </div>
  );
};

export default ManageTool;
