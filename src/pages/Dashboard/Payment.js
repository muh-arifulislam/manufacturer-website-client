import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
const axios = require('axios').default;
const stripePromise = loadStripe('pk_test_51L3CzjIh6oFyk2898M9rKncSQrWXYgy7mvPZBysrRU1f5LtKxZwJRgrbKOtwz6diPKrNMo4EgR6a73WJgCkFA00g00afXexeG7');
const Payment = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const { name, totalPrice } = order;
    useEffect(() => {
        axios.get(`http://localhost:5000/order/${id}`)
            .then(function (response) {
                // handle success
                console.log(response);
                setOrder(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [])
    return (
        <div className="">
            <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
                <div className="card-body">
                    <h2 className="card-title">pay for {name}</h2>
                    <p>Please pay ${totalPrice}</p>
                </div>
            </div>
            <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;