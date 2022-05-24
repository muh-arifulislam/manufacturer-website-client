import React from 'react';

const OrderTableRow = ({ item, setRemovingItemId }) => {
    const { name, _id, date, isPaid, orderQuantity } = item.data;
    const { id } = item;
    return (
        <tr>
            <th>1</th>
            <td>{name}</td>
            <td>May 20, 2022</td>
            <td>{orderQuantity}</td>
            <td>$18200</td>
            <td>
                {
                    isPaid ? <button className="btn btn-sm px-[20px]">Paid</button> :
                        <div className="tooltip" data-tip="Click to payment process">
                            <button className="btn btn-sm">unpaid</button>
                        </div>
                }
            </td>
            <td>
                <label onClick={() => setRemovingItemId(id)} htmlFor="confirm-modal" className="btn btn-sm btn-error text-white modal-button" disabled={isPaid}>remove</label>
            </td>
        </tr>
    );
};

export default OrderTableRow;