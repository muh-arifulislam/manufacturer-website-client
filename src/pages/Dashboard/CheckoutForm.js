import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
const CheckoutForm = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { customerName, totalPrice, name, id, _id, orderQuantity, email } =
    order;
  useEffect(() => {
    if (totalPrice) {
      fetch(
        "https://manufacturer-website-server-production-7476.up.railway.app/create-payment-intent",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ totalPrice }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        });
    }
  }, [totalPrice]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!elements || !stripe) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    setCardError(error?.message || "");
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: customerName,
            email: email,
          },
        },
      });
    if (intentError) {
      setCardError(intentError.message);
    } else {
      setCardError("");
      toast.success("Your Payment has been successful");
      // update order
      fetch(
        `https://manufacturer-website-server-production-7476.up.railway.app/update-order/`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ id: _id, paymentId: paymentIntent.id }),
        }
      )
        .then((res) => res.json())
        .then((data) => {});
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="">
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
          className="btn btn-primary mt-[20px]"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-500 ">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
