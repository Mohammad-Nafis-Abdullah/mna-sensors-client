import React from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading";

const stripePromise = loadStripe(
  "pk_test_51L0ozSFQMC6ZB6bzt0dxa1LaoMEuD6gRJRf610DtiJ5HQ8OUPWSK5UBcaF13eDEGuncz7XIkz8ggSzRwL42z1HxR00AQ59TUxV"
);
const Payment = () => {
  const { orderId } = useParams();
  const url = `http://localhost:5000/order/${orderId}`;

  const { data: order, isLoading } = useQuery(["order", orderId], () =>
    axios
      .get(url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((data) => {
        return data.data;
      })
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="text-lg text-primary font-bold text-left ml-3">
        Payment of {orderId} and {order?.toolName}
      </h2>
      <div className="hero min-h-screen">
        <div className="flex-col ">
          <div className="card w-50 max-w-md bg-secondary shadow-xl mb-4 ">
            <div className="card-body glass text-white">
              <h2 className="card-title text-xl font-bold">
                Hello<span className="">{order?.name}</span>
              </h2>
              <p>
                Your have an Order about{" "}
                <span className="text-primary font-semibold">
                  {order?.quantity}
                </span>{" "}
                Peices of{" "}
                <span className="text-primary font-semibold">
                  {order?.toolName}
                </span>
              </p>
              <p className="text-lg font-bold">
                Like to Pay{" "}
                <span className="text-primary">${order?.totalPrice}</span> Now?
              </p>
            </div>
          </div>
          <div className="card w-50 max-w-md bg-base-100 shadow-xl mb-4">
            <div className="card-body">
              <Elements stripe={stripePromise}>
                <CheckoutForm order={order} />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
