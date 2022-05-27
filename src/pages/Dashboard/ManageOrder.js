import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    useQuery
} from 'react-query';
import auth from '../../firebase.init';
import Loading from '../shared/Loading';
import ConfirmModal from './ConfirmModal';
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
    const [removingItemId, setRemovingItemId] = useState('');
    const handleCancelOrder = () => {
        axios.delete(`http://localhost:5000/order/${removingItemId}?email=${user.email}`, { headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
            .then(function (response) {
                // handle success
                console.log(response);
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
                                <button className="btn btn-sm">Deliver</button>
                            </td>
                            <td>
                                <button className="btn btn-sm">Pay</button>
                            </td>
                            <td>
                                <label onClick={() => setRemovingItemId(order._id)} htmlFor="confirm-modal" className="btn btn-sm" disabled={order.status}>Cancel</label>
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