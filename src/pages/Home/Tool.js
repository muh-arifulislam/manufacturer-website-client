import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tool = ({ tool }) => {
    const { _id, name, description, minOrder, quantity, price } = tool;
    const navigate = useNavigate();
    return (
        <div className="card lg:w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10"><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Description: {description.slice(0, 100)}....</p>
                <p>Minimum Order: {minOrder}</p>
                <p>Available Quantity: {quantity}</p>
                <p>Price: ${price}</p>
                <div className="card-actions justify-start">
                    <button onClick={() => navigate(`/purchase/${_id}`)} className="btn btn-primary">Purchase</button>
                </div>
            </div>
        </div>
    );
};

export default Tool;