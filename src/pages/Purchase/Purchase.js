import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Loading from "../shared/Loading";
const axios = require("axios").default;
const Purchase = () => {
  const date = new Date();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const formattedDate = format(date, "PP");
  const [user] = useAuthState(auth);
  const [product, setProduct] = useState({});
  const [orderQuantity, setOrderQuantity] = useState("0");
  const handleOrderChange = (event) => {
    setOrderQuantity(event.target.value);
  };
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, []);
  let [quantity, setQuantity] = useState(1);
  // useEffect(() => {
  //   setOrderQuantity(minOrder?.toString());
  // }, [tool]);
  const handleQuantityPlus = () => {
    if (quantity) {
      setQuantity(parseInt(quantity) + 1);
    } else {
      setQuantity(1);
    }
  };
  const handleQuantityMinus = () => {
    if (quantity > 1) {
      setQuantity(parseInt(quantity) - 1);
    }
  };
  const addressRef = useRef("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const handleOrder = () => {
    if (!address) {
      toast.warning("Please Enter a Billing Address");
    }
    if (!phone || phone.length < 11) {
      toast.warning("Please Enter a Valid Phone Number");
    } else {
      const totalPrice = parseInt(product?.price) * parseInt(quantity);
      const data = {
        id: product?.id,
        name: product?.title,
        orderQuantity: product?.quantity,
        email: user.email,
        date: formattedDate,
        address: address,
        totalPrice: totalPrice,
        customerName: user?.displayName,
        isPaid: false,
        transitionId: "",
        status: "",
      };
      axios
        .put(
          "https://manufacturer-website-server-production-7476.up.railway.app/order",
          data
        )
        .then(function (response) {
          // handle success
          console.log(response);
          toast.success("your order successful");
        })
        .catch(function (error) {
          // handle error
          toast.error("your order unsuccessful");
        });
    }
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse gap-[50px]">
          <div className="card flex-shrink-0 w-full max-w-sm lg:order-1 order-2 max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="flex justify-center">
                <button
                  onClick={handleQuantityMinus}
                  className="py-2 px-4 border bg-slate-200 rounded-l-lg"
                >
                  <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                </button>
                <input
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  placeholder="qunatity"
                  className="input-bordered border w-[30%]"
                  value={quantity}
                />
                <button
                  onClick={handleQuantityPlus}
                  className="py-2 px-4 border bg-slate-200 rounded-r-lg"
                >
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered mt-[12px] w-full max-w-xs"
                  value={user?.displayName}
                  readOnly
                />
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  placeholder="Enter Phone Number"
                  className="input input-bordered mt-[12px] w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered mt-[12px] w-full max-w-xs"
                  value={user?.email}
                  readOnly
                />
                <textarea
                  onChange={(e) => setAddress(e.target.value)}
                  className="textarea textarea-bordered mt-[12px] w-full max-w-xs"
                  placeholder="address"
                ></textarea>
              </div>
              {/* <div>
                {orderQuantity < minOrder && (
                  <p className="text-center">
                    <small>You have to order minimum {minOrder} item**</small>
                  </p>
                )}
                {orderQuantity > quantity && (
                  <p className="text-center text-red-500">
                    <small>
                      You can can't buy items more then available quantity**
                    </small>
                  </p>
                )}
              </div> */}
              <div className="form-control mt-6">
                <button
                  onClick={handleOrder}
                  className="btn btn-primary"
                  disabled={!parseInt(quantity)}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
          <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100 lg:order-2 order-1">
            <div className="card lg:w-full bg-base-100 shadow-xl">
              <figure className="px-10 pt-10 w-[80%] mx-auto">
                <img src={product?.images[0]} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product?.title}</h2>
                <p className="font-bold">Price: ${product?.price}</p>
                {/* <p>Minimum Order: {minOrder}</p> */}
                <p>Available Quantity: {product?.stock}</p>
                <p>
                  <span className="font-bold">Description:</span>{" "}
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
