import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderTableRow = ({ item, setRemovingItemId }) => {
    const { name, _id, date, isPaid, orderQuantity, transitionId, totalPrice } = item;
    const { id } = item;
    const navigate = useNavigate();
    return (
        <tr>
            <th>1</th>
            <td>{name}</td>
            <td>May 20, 2022</td>
            <td>{orderQuantity}</td>
            <td>${totalPrice}</td>
            <td>{transitionId}</td>
            <td>
                {
                    !isPaid ? <button onClick={() => navigate(`payment/${_id}`)} className="btn btn-sm">Payment</button> :
                        <button className="btn btn-sm px-[27px]">paid</button>
                }
            </td>
            <td>
                <label onClick={() => setRemovingItemId(_id)} htmlFor="confirm-modal" className="btn btn-sm btn-error text-white modal-button" disabled={isPaid}>remove</label>
            </td>
        </tr>
    );
};

export default OrderTableRow;