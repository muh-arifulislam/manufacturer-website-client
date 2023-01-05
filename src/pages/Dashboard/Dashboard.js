import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
const axios = require("axios").default;
const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState("");
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://manufacturer-website-server-production-7476.up.railway.app/user/${user.email}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then(function (response) {
          // handle success
          setUserData(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error.message, "hei");
        });
    }
  }, [user]);
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        {/* <!-- Page content here --> */}
        <Outlet></Outlet>
        <div className="fixed bottom-10 left-10">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden z-50"
          >
            Open drawer
          </label>
        </div>
      </div>
      <div className="drawer-side ">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-gray-200 text-base-content">
          {/* <!-- Sidebar content here --> */}
          {!userData?.role && (
            <>
              <li>
                <Link to="/dashboard">My Orders</Link>
              </li>
              <li>
                <Link to="review">Add A Review</Link>
              </li>
            </>
          )}
          <li>
            <Link to="my-profile">My Profile</Link>
          </li>
          {userData?.role && (
            <>
              <li>
                <Link to="manage-orders">Manage Orders</Link>
              </li>
              <li>
                <Link to="add-product">Add Product</Link>
              </li>
              <li>
                <Link to="make-admin">Make Admin</Link>
              </li>
              <li>
                <Link to="manage-products">Manage Products</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
