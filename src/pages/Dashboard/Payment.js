import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
const axios = require("axios").default;
const stripePromise = loadStripe(
  "pk_test_51L3CzjIh6oFyk2898M9rKncSQrWXYgy7mvPZBysrRU1f5LtKxZwJRgrbKOtwz6diPKrNMo4EgR6a73WJgCkFA00g00afXexeG7"
);
const Payment = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const { name, totalPrice } = order;
  useEffect(() => {
    axios
      .get(
        `https://manufacturer-website-server-production-7476.up.railway.app/order/${id}`
      )
      .then(function (response) {
        // handle success
        console.log(response);
        setOrder(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  return (
    <section>
      <div className="w-80 mx-auto">
        <div className="card border w-full bg-base-100 my-12">
          <div className="card-body">
            <h2 className="card-title">Pay for {name}</h2>
            <p className="font-bold">Total: ${totalPrice}</p>
          </div>
        </div>
        <div className="card border flex-shrink-0 w-full bg-base-100">
          <div className="card-body">
            <Elements stripe={stripePromise}>
              <CheckoutForm order={order} />
            </Elements>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
