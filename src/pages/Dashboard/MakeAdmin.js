import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    useQuery
} from 'react-query';
import auth from '../../firebase.init';
import Loading from '../shared/Loading';
import ConfirmModal from './ConfirmModal';
const axios = require('axios').default;
const MakeAdmin = () => {
    const [user] = useAuthState(auth);
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch(`http://localhost:5000/user?email=${user.email}`, {
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
    const [selectedUserId, setSelectedUserId] = useState('');
    const handleMakeAdmin = () => {
        axios.put(`http://localhost:5000/make-admin/${selectedUserId}`)
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
                        users.map(user => <tr key={user._id}>
                            <th>{users.indexOf(user) + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {
                                    user.role ? user.role : "customer"
                                }
                            </td>
                            <td>
                                <label onClick={() => setSelectedUserId(user._id)} htmlFor="confirm-modal" className="btn btn-sm" disabled={user.role}>Make Admin</label>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <ConfirmModal>{handleMakeAdmin}</ConfirmModal>
        </div >
    );
};

export default MakeAdmin;