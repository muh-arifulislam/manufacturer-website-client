import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import {
    useQuery
} from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../shared/Loading';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
const ManageProducts = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const { data: products, isLoading, refetch } = useQuery('products', () => fetch(`https://polar-gorge-51199.herokuapp.com/tool`)
        .then(async (res) => {
            if (res.status === 403 || res.status === 401) {
                localStorage.removeItem('accessToken');
                await signOut(auth);
                navigate('/login');
            }
            return res.json();
        }))
    const [selectedProductId, setSelectedProductId] = useState('');
    const handleDeleteProduct = () => {
        fetch(`https://polar-gorge-51199.herokuapp.com/tool/${selectedProductId}?email=${user.email}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.error("Product has been deleted");
                    refetch();
                }
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
                        <th className='normal-case'>Name</th>
                        <th className='normal-case'>Avaiable</th>
                        <th className='normal-case'>Price</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        products?.map(product => <tr key={product._id}>
                            <th>{products.indexOf(product) + 1}</th>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>${product.price}</td>
                            <td>
                                <label onClick={() => setSelectedProductId(product._id)} htmlFor="confirm-modal" className="btn btn-sm">Delete</label>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <ConfirmModal>{handleDeleteProduct}</ConfirmModal>
        </div >
    );
};

export default ManageProducts;