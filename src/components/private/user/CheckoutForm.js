import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../Shared/Loading";

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
  const totalPrice = order?.totalPrice;
  const toolName = order?.toolName;

  useEffect(() => {
    const url = "http://localhost:5000/create-payment-intent";
    axios
      .post(
        url,
        { totalPrice },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((data) => {
        console.log(data);
        if (data.data.clientSecret) {
          setClientSecret(data.data.clientSecret);
        }
      });
  }, [totalPrice]);

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
      setTransactionId(paymentIntent.id);
      setSuccess(`Your Payment of ${toolName} is Completed`);

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
  return (
    <>
      <form onSubmit={handleSubmit}>
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
          className="btn btn-success btn-sm mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || success}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-error font-semibold">{cardError}</p>}
      {success && (
        <div className="text-success font-semibold">
          <p>{success}</p>
          <p>
            Transaction Id:{" "}
            <span className="font-bold text-gray-800">{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
