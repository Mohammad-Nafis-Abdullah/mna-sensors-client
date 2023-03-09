// import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import DeleteConfirmModel from "./DeleteConfirmModal";
import ManageTool from "./ManageTool";

const ManageTools = () => {
  const [deleteTool, setDeleteTool] = useState(null);
  const url = "http://localhost:5000/sensors";
  const { data: tools, refetch } = useFetch(url,[]);
  return (
    <div className="py-5">
      <h2 className="text-left ml-3 text-lg text-white font-bold">
        Manage Tools : {tools?.length}
      </h2>
      <div className="my-3">
        <div className="flex flex-wrap gap-2 justify-center">
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
            className="no-underline inline-block bg-white border-none text-neutral-focus font-bold py-2 px-3 mt-4 rounded-md mx-auto w-2/5 text-center "
            to="/dashboard/add-sensor"
          >
            Add New Sensor
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
