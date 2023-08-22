/* eslint-disable no-unused-vars */
import React from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Loading from "../../public/Loading";
import { useQueryFetch } from "../../../hooks/useQueryFetch";

const stripePromise = loadStripe(
  'pk_test_51L3eYcIsG6t6EWnkOiJzzkmaaKd3tr3LcGjdbhkuKH1YYdZ1Qfvcf6IFMt1ChcJ7eJCXtpl7RZiPaj9HH3W3fk8M00rIbRpG9V'
);
const Payment = () => {
  const { id } = useParams();
  const { data: order, loading, refetch } = useQueryFetch('single-order',`${process.env.REACT_APP_Backend_url}/order/${id}`, {})

  return (
    <div>
      {loading && <Loading />}
      <h2 className="text-xl text-white font-bold text-left ml-3">
        Payment for {order?.productName}
      </h2>
      <div className="hero mt-5">
        <div className="flex flex-wrap gap-3 justify-center w-full p-5">
          <div className="card w-50 max-w-xs w-full ">
            <div className="text-white">
              <div className="text-xl font-bold">
                <small>Hello,</small><br /><h3 className="">{order?.name}</h3>
              </div>
              <p>
                Your have an Order about{" "}
                <span className="text-amber-300 text-2xl font-semibold">{order?.orderQuantity}</span>{" "}Peices of{" "}
                <span className="text-amber-300 text-2xl font-semibold">
                  {order?.productName}
                </span>
              </p>
              <p className="text-lg font-bold">
                Like to Pay{" "}
                <span className="text-amber-300 text-2xl">${order?.orderCost}</span> Now?
              </p>
            </div>
          </div>
          <div className="card w-50 max-w-xs w-full bg-neutral-focus">
            <div className="bg-white rounded-xl h-40 p-5 ">
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
