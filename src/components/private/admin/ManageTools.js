// import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import useReactQuery from "../../../hooks/useFetch";
import DeleteConfirmModel from "./DeleteConfirmModal";
import ManageTool from "./ManageTool";

const ManageTools = () => {
  const [deleteTool, setDeleteTool] = useState(null);
  const url = "http://localhost:5000/tools";
  const header = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const { data: tools, refetch } = useReactQuery(url, header);
  return (
    <div className="">
      <h2 className="text-left ml-3 text-lg text-primary font-bold">
        Manage Tools : {tools?.length}
      </h2>
      <div className="my-3 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mx-3">
          {tools?.map((tool) => (
            <ManageTool
              key={tool._id}
              tool={tool}
              setDeleteTool={setDeleteTool}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            className="no-underline inline-block bg-primary text-secondary font-bold py-1 px-3 mt-4 rounded-md mx-auto w-2/5 text-center"
            to="/dashboard/addTool"
          >
            Add New Tool
          </Link>
        </div>
        {deleteTool && (
          <DeleteConfirmModel
            deleteTool={deleteTool}
            setDeleteTool={setDeleteTool}
            refetch={refetch}
          />
        )}
      </div>
    </div>
  );
};

export default ManageTools;
