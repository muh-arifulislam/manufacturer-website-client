import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
const Tool = ({ product }) => {
  const {
    id,
    brand,
    category,
    description,
    discountPercentage,
    price,
    stock,
    thumbnail,
    title,
    images,
  } = product;
  const navigate = useNavigate();
  return (
    <div className="bg-white p-[20px] shadow-md rounded flex flex-col justify-between">
      <img className="w-[200px] mx-auto" src={images[0]} alt="" />
      <div>
        <h4 className="text-xl text-center font-bold mt-2 mb-1">{title}</h4>
        <h4 className="text-lg mb-1">
          Price: <span className="font-bold">${price}</span>
        </h4>
        <p>Stock: {stock}</p>
        <p className="overflow-hidden">Description: {description}</p>
      </div>
      <div className="mt-5 flex flex-col justify-between">
        <button
          onClick={() => navigate(`/purchase/${id}`)}
          className="py-2 rounded bg-slate-200 flex justify-center items-center mb-3 hover:text-blue-600 transition-all"
        >
          <FontAwesomeIcon size="lg" icon={faBagShopping}></FontAwesomeIcon>
          <span className="ml-2 text-lg font-bold">Purchase Now</span>
        </button>
        <button className="btn btn-primary">Details</button>
      </div>
    </div>
  );
};

export default Tool;
