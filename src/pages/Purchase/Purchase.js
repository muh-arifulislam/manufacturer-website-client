import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { format } from 'date-fns';
const Purchase = () => {
    const date = new Date();
    const formattedDate = format(date, 'PP');
    const [user] = useAuthState(auth);
    const [tool, setTool] = useState({});
    const { _id, name, price, quantity, minOrder, description } = tool;
    const [orderQuantity, setOrderQuantity] = useState('0');
    const handleOrderChange = (event) => {
        setOrderQuantity(event.target.value);
    }
    const { id } = useParams();
    useEffect(() => {
        fetch('http://localhost:5000/tool')
            .then(res => res.json())
            .then(data => {
                const findedItem = data.find(item => item._id == id);
                setTool(findedItem);
            })

    }, []);
    const handleQuantityPlus = () => {
        const newQuantity = parseInt(orderQuantity) + 1;
        setOrderQuantity(`${newQuantity}`);
    }
    const handleQuantityMinus = () => {
        const newQuantity = parseInt(orderQuantity) - 1;
        if (newQuantity >= minOrder) {
            setOrderQuantity(`${newQuantity}`);
        }
    }
    const handleOrder = () => {
        const data = {
            _id: _id,
            name: name,
            orderQuantity: orderQuantity,
            email: user.email,
            date: formattedDate
        }
        console.log(data)
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse gap-[50px]">
                    <div className="card flex-shrink-0 w-full max-w-sm lg:order-1 order-2 max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="flex justify-center">
                                <button onClick={handleQuantityMinus} className="py-2 px-4 border bg-slate-200 rounded-l-lg">
                                    <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                                </button>
                                <input onChange={handleOrderChange} type="number" placeholder="qunatity" className="input-bordered border w-[30%]" value={orderQuantity} />
                                <button onClick={handleQuantityPlus} className="py-2 px-4 border bg-slate-200 rounded-r-lg">
                                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                </button>
                            </div>
                            <div>
                                {
                                    orderQuantity < minOrder &&
                                    <p className='text-center'><small>You have to order minimum {minOrder} item**</small></p>
                                }
                            </div>
                            <div className="form-control mt-6">
                                <button onClick={handleOrder} className="btn btn-primary" disabled={orderQuantity < minOrder || orderQuantity > quantity}>Add Order</button>
                            </div>
                        </div>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100 lg:order-2 order-1">
                        <div className="card lg:w-full bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10"><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{name}</h2>
                                <p>Price: ${price}</p>
                                <p>Minimum Order: {minOrder}</p>
                                <p>Available Quantity: {quantity}</p>
                                <p><span className='font-bold'>Description:</span> {description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Purchase;