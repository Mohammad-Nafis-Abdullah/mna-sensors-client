import React, { useEffect, useState } from "react";
import auth from "../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signOut } from "firebase/auth";



const MyOrders = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  console.log(orders);

  useEffect(() => {
    if (user) {
      const url = `http://localhost:5000/orders?email=${user.email}`;
      axios
        .get(url, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((data) => {
          // console.log(data);
          setOrders(data.data);
        })
        .catch((err) => {
          if (err.response.status === 401 || err.response.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/home");
          }
        });
    }
  }, [user, navigate]);



  return (
    <div>
      <h2 className="text-lg text-white font-bold text-left ml-3">
        My Orders : {orders.length}
      </h2>
      <div className="overflow-x-auto w-full mx-0 min-w-0 ">
        <table className="table table-compact w-full text-center">
          <thead>
            <tr className="text-center border-2 border-neutral-focus">
              <th>Sl No.</th>
              <th>Name</th>
              <th>Sensors</th>
              <th>
                Quantity <small>(Pcs)</small>
              </th>
              <th>
                Cost <small>($)</small>
              </th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{order.name}</td>
                <td>{order.productName}</td>
                <td>{order.orderQuantity} Pieces</td>
                <td>${order.orderCost}</td>
                <td>
                  {order.orderCost && !order.paid && (
                    <div className="text-center space-y-1">
                      <Link to={`/dashboard/payment/${order._id}`} className="btn btn-xs btn-success text-neutral-focus">
                        Pay Now
                      </Link><br />
                      <Link to=""  className="btn btn-xs btn-error text-white ">
                        Cancel Order
                      </Link>
                    </div>
                  )}
                  {order.totalPrice && order.paid && (
                    <div>
                      <div className="text-center text-white w-1/3 font-semibold bg-accent rounded-md mx-auto">
                        PAID
                      </div>
                      <p className="font-semibold">
                        Transaction Id:{" "}
                        <span className="text-success ">
                          {order.transactionId}
                        </span>
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
