import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import ConfirmModal from './ConfirmModal';
import OrderTableRow from './OrderTableRow';
import {
    useQuery
} from 'react-query';
import Loading from '../shared/Loading';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const axios = require('axios').default;
const MyOrder = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const { data: items, isLoading, refetch } = useQuery('order', () => fetch(`http://localhost:5000/order?email=${user.email}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(async (res) => {
            if (res.status === 403 || res.status === 401) {
                localStorage.removeItem('accessToken');
                await signOut(auth);
                navigate('/login');
            }
            return res.json();
        }))
    const [removingItemId, setRemovingItemId] = useState('');
    const handleRemoveItem = () => {
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
        return <Loading></Loading>;
    }

    return (
        <section className='p-4'>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Item</th>
                            <th>Date</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Transition ID</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items?.map(item => <OrderTableRow key={item._id} item={item} setRemovingItemId={setRemovingItemId}></OrderTableRow>)
                        }
                    </tbody>
                </table>
            </div>
            <ConfirmModal>{handleRemoveItem}</ConfirmModal>
        </section>
    );
};

export default MyOrder;