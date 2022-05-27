import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-toastify";
import ManageAllOrder from "./ManageAllOrder";
import "react-toastify/dist/ReactToastify.css";
import CancelOrderAdmin from "./CancelOrderAdmin";
import axios from "axios";

const ManageAllOrders = () => {
  const [order, setOrder] = useState(null);
  const url = "http://localhost:5000/get/orders";
  const header = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  const { data: orders, refetch } = useFetch(url, header,'manageOrders');

  const handelShift = (id) => {
    axios.put(`http://localhost:5000/shift/order/${id}`,{shift:true},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((data) => {
        console.log(data?.data);
        if (data?.data?.modifiedCount > 0) {
          toast.success("Product Successfully Shifted");
          refetch();
        }
      });
  };

  const cancelOrder = (id) => {
    fetch(
      `http://localhost:5000/cancel/order/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Successfully cancel the order");
          refetch();
        }
      });
  };
  return (
    <>
      <h2 className="text-center text-3xl mt-5 mb-5 font-bold">
        Manage All Orders
      </h2>
      <h2 className="text-center text-2xl mt-5 mb-5 font-bold">
        {" "}
        Total Orders: {orders?.length}{" "}
      </h2>

      <div className="overflow-x-auto mx-3">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Tool</th>
              <th>
                Quantity <small>(Pcs)</small>
              </th>
              <th>
                Total Amount <small>(USD)</small>
              </th>
              <th>Status</th>
              <th>Transaction ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <ManageAllOrder
                index={index}
                key={order._id}
                order={order}
                setOrder={setOrder}
                handelShift={handelShift}
              ></ManageAllOrder>
            ))}
          </tbody>
        </table>
        <CancelOrderAdmin
          cancelOrder={cancelOrder}
          order={order}
        ></CancelOrderAdmin>
      </div>
    </>
  );
};

export default ManageAllOrders;
