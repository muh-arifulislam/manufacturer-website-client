import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    useQuery
} from 'react-query';
import auth from '../../firebase.init';
import ConfirmModal from './ConfirmModal';
const MakeAdmin = () => {
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
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
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
                                <button className="btn btn-sm">Make Admin</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <ConfirmModal></ConfirmModal>
        </div >
    );
};

export default MakeAdmin;