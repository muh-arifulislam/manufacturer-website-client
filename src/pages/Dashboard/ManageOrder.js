import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    useQuery
} from 'react-query';
import auth from '../../firebase.init';
import Loading from '../shared/Loading';
import ConfirmModal from './ConfirmModal';
import { toast } from 'react-toastify';
const axios = require('axios').default;
const ManageOrder = () => {
    const [user] = useAuthState(auth);
    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch(`http://localhost:5000/order?email=${user.email}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(async (res) => {
            // if (res.status === 403 || res.status === 401) {
            //     localStorage.removeItem('accessToken');
            //     await signOut(auth);
            //     navigate('/login');
            // }
            return res.json();
        }))
    const [selectedOrderId, setselectedOrderId] = useState('');
    const handleCancelOrder = () => {
        axios.delete(`http://localhost:5000/order/${selectedOrderId}?email=${user.email}`, { headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
            .then(function (response) {
                // handle success
                toast.success("Order deleted successfully")
                refetch();
            })
            .catch(function (error) {
                // handle error
                console.log(error.message, 'hei');
            })
    }
    const handleDeliverOrder = (id) => {
        axios.put(`http://localhost:5000/order/${id}?email=${user.email}`, { operation: "deliver" }, { headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
            .then(function (response) {
                // handle success
                toast.success("Order deliver successfull")
                refetch();
            })
            .catch(function (error) {
                // handle error
                console.log(error.message, 'hei');
            })
    }
    const handlePayOrder = (id) => {
        axios.put(`http://localhost:5000/order/${id}?email=${user.email}`, { operation: "payment" }, { headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
            .then(function (response) {
                // handle success
                toast.success("Order payment successfull")
                refetch();
            })
            .catch(function (error) {
                // handle error
                console.log(error.message, 'hei');
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Date</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order => <tr key={order._id}>
                            <th>1</th>
                            <td>{order.date}</td>
                            <td>{order.email}</td>
                            <td>
                                {
                                    order.status ? order.status : "unpaid"
                                }
                            </td>
                            <td>
                                <label onClick={() => handleDeliverOrder(order._id)} className="btn btn-sm" disabled={order.status === "delivered"}>Deliver</label>
                            </td>
                            <td>
                                <label onClick={() => handlePayOrder(order._id)} className="btn btn-sm" disabled={order.isPaid}>Pay</label>
                            </td>
                            <td>
                                <label onClick={() => setselectedOrderId(order._id)} htmlFor="confirm-modal" className="btn btn-sm" disabled={order.status}>Cancel</label>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <ConfirmModal>{handleCancelOrder}</ConfirmModal>
        </div >
    );
};

export default ManageOrder;