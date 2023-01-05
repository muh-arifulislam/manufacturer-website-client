import React, { useState } from "react";
import { useEffect } from "react";
import Tool from "../Home/Tool";
import Loading from "../shared/Loading";
import FilterSection from "./FilterSection";
const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    const count = 100;
    const pages = Math.ceil(count / 9);
    setPageCount(pages);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetch(`https://dummyjson.com/products?limit=9&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, [skip]);
  useEffect(() => {
    if (query) {
      fetch(`https://dummyjson.com/products/category/${query}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
        });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setPage(0);
      setSkip(0);
      fetch(`https://dummyjson.com/products?limit=9&skip=0`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
        });
    }
  }, [query]);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="lg:px-[80px] px-[15px] pb-10 pt-[50px] bg-accent">
      <h4 className="text-3xl font-bold text-center mb-10">All Products</h4>
      <div className="grid lg:grid-cols-4 grid-cols-1">
        <div>
          <FilterSection query={query} setQuery={setQuery}></FilterSection>
        </div>
        <div className="col-span-3 px-5 ">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
            {products?.map((product) => (
              <Tool product={product} key={product.id}></Tool>
            ))}
          </div>
          <div className="py-[20px] flex lg:justify-end justify-center">
            {!query &&
              [...Array(pageCount).keys()].map((num) => (
                <button
                  onClick={(e) => {
                    setSkip(num * 9);
                    setPage(num);
                    setQuery("");
                  }}
                  className={`${
                    page === num
                      ? "px-2 py-1 bg-red-500 border border-slate-200 "
                      : "px-2 py-1 bg-slate-100 border border-slate-200"
                  }`}
                >
                  {num + 1}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
