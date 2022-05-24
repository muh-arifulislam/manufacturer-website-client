import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import ConfirmModal from './ConfirmModal';
import OrderTableRow from './OrderTableRow';
import {
    useQuery
} from 'react-query';
import Loading from '../shared/Loading';
const axios = require('axios').default;
const MyOrder = () => {
    const [user] = useAuthState(auth);
    // const [items, setItems] = useState([]);
    const { data: items, isLoading, refetch } = useQuery('order', () => fetch('http://localhost:5000/order/arifibnenam@gmail.com')
        .then(res => res.json()))
    // useEffect(() => {
    //     axios.get(`http://localhost:5000/order/arifibnenam@gmail.com`)
    //         .then(function (response) {
    //             // handle success
    //             setItems(response.data);
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         })
    // }, [])
    const [removingItemId, setRemovingItemId] = useState('');
    const handleRemoveItem = () => {
        axios.delete(`http://localhost:5000/order/${removingItemId}`)
            .then(function (response) {
                // handle success
                console.log(response);
                refetch();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
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
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(item => <OrderTableRow key={item._id} item={item} setRemovingItemId={setRemovingItemId}></OrderTableRow>)
                        }
                    </tbody>
                </table>
            </div>
            <ConfirmModal handleRemoveItem={handleRemoveItem}></ConfirmModal>
        </section>
    );
};

export default MyOrder;