import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../shared/Loading";
import Tool from "./Tool";

const Tools = () => {
  const navigate = useNavigate();
  const [mobiles, setMobiles] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [groceries, setGroceries] = useState([]);
  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/smartphones`)
      .then((res) => res.json())
      .then((data) => {
        const newProducts = [];
        for (let item in data.products) {
          if (item < 5) {
            newProducts.push(data.products[item]);
          }
        }
        setMobiles(newProducts);
      });
    fetch(`https://dummyjson.com/products/category/laptops`)
      .then((res) => res.json())
      .then((data) => {
        const newProducts = [];
        for (let item in data.products) {
          if (item < 5) {
            newProducts.push(data.products[item]);
          }
        }
        setLaptops(newProducts);
      });
    fetch(`https://dummyjson.com/products/category/groceries`)
      .then((res) => res.json())
      .then((data) => {
        const newProducts = [];
        for (let item in data.products) {
          if (item < 5) {
            newProducts.push(data.products[item]);
          }
        }
        setGroceries(newProducts);
      });
  }, []);
  return (
    <section id="tools" className="py-[50px] lg:px-[50px] px-[20px] bg-accent">
      <div>
        <h2 className="text-3xl font-bold text-center text-white mb-10">
          Phones
        </h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-[30px] gap-[15px]">
          {mobiles.map((mobile) => (
            <Tool key={mobile.id} product={mobile}></Tool>
          ))}
          <div className="flex justify-center items-center">
            <button
              onClick={() => navigate("/products")}
              className="btn btn-primary normal-case"
            >
              <span>See All Products</span>
              <FontAwesomeIcon
                size="lg"
                className="ml-3"
                icon={faArrowRightLong}
              ></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
      <div className="my-10">
        <h2 className="text-3xl font-bold text-center text-white mb-10">
          Laptops
        </h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-[30px] gap-[15px]">
          {laptops.map((laptop) => (
            <Tool key={laptop.id} product={laptop}></Tool>
          ))}
          <div className="flex justify-center items-center">
            <button
              onClick={() => navigate("/products")}
              className="btn btn-primary normal-case"
            >
              <span>See All Products</span>
              <FontAwesomeIcon
                size="lg"
                className="ml-3"
                icon={faArrowRightLong}
              ></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
      <div className="my-10">
        <h2 className="text-3xl font-bold text-center text-white mb-10">
          Groceries
        </h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-[30px] gap-[15px]">
          {groceries.map((groceries) => (
            <Tool key={groceries.id} product={groceries}></Tool>
          ))}
          <div className="flex justify-center items-center">
            <button
              onClick={() => navigate("/products")}
              className="btn btn-primary normal-case"
            >
              <span>See All Products</span>
              <FontAwesomeIcon
                size="lg"
                className="ml-3"
                icon={faArrowRightLong}
              ></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
