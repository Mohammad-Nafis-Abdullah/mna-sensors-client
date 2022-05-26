/* eslint-disable no-unused-vars */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../public/Loading";

const CheckoutForm = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState("");

  const _id = order?._id;
  const name = order?.name;
  const email = order?.email;
  const orderCost = order?.orderCost;
  const productName = order?.productName;
  // console.log(order);

  useEffect(() => {
    const url = "http://localhost:5000/create-payment-intent";
    axios
      .post(
        url,
        { orderCost },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((data) => {
        // console.log(data);
        if (data.data.clientSecret) {
          setClientSecret(data.data.clientSecret);
        }
      });
  }, [orderCost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    if (processing) {
      return <Loading />;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    setCardError(error?.message || "");
    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
          },
        },
      });
    if (intentError) {
      setCardError(intentError?.message);
      setProcessing(false);
    } else {
      setCardError("");
      setTransactionId(paymentIntent?.id);
      setSuccess(`Your Payment of ${productName} is Completed`);

      const payment = {
        appointment: _id,
        transactionId: paymentIntent.id,
      };
      axios
        .patch(`http://localhost:5000/order/${_id}`, payment, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((data) => {
          setProcessing(false);
          console.log(data.data);
        });
    }
  };

  // console.log(transactionId);

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col justify-evenly h-[55%]" >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-success btn-sm"
          type="submit"
          disabled={!stripe || !clientSecret || success}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-error font-semibold">{cardError}</p>}
      {success && (
        <div className="text-success font-semibold text-xs space-y-2">
          <p className="text-emerald-600">{success}</p>
          <p className="text-emerald-600">
            Transaction Id:{" "}
            <span className="font-bold text-sm text-neutral-focus">{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
