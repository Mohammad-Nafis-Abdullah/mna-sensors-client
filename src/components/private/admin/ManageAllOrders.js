import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import ManageAllOrder from "./ManageAllOrder";
import "react-toastify/dist/ReactToastify.css";
import CancelOrderAdmin from "./CancelOrderAdmin";
import axios from "axios";
import { useQueryFetch } from "../../../hooks/useQueryFetch";
import Loading from "../../public/Loading";
import { StateContext } from "../../../App";

const ManageAllOrders = () => {
  const [order, setOrder] = useState(null);
  const [state] = useContext(StateContext);
  const { data: orders, loading, refetch } = useQueryFetch('all-order',`${process.env.REACT_APP_Backend_url}/get/orders`, []);

  const handelShift = (id) => {
    axios.put(`${process.env.REACT_APP_Backend_url}/shift/order/${id}`, { shift: true },
      {
        headers: {
          uid: state.user?.uid,
        },
      }
    )
      .then((data) => {
        // console.log(data?.data);
        if (data?.data?.modifiedCount > 0) {
          toast.success("Product Successfully Shifted");
          refetch();
        }
      });
  };

  const cancelOrder = (id) => {
    fetch(
      `${process.env.REACT_APP_Backend_url}/cancel/order/${id}`,
      {
        method: "DELETE",
        headers: {
          uid: state.user?.uid,
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
    <div className="space-y-2">
      {loading && <Loading/>}
      <h2 className="text-center text-3xl font-bold text-white">
        Manage All Orders
      </h2>
      <h2 className="text-left ml-3 text-2xl font-bold text-white">
        {" "}
        Total Orders: {orders?.length}{" "}
      </h2>

      <div className="overflow-x-auto mx-3 rounded-xl">
        <table className="table w-full rounded-xl">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Tool</th>
              <th>
                Quantity <small>(Pcs)</small>
              </th>
              <th>
                Total Amount <small>($)</small>
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
    </div>
  );
};

export default ManageAllOrders;
