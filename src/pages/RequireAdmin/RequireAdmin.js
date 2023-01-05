import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useQuery } from "react-query";
import { signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../shared/Loading";
const RequireAdmin = ({ children }) => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery("user", () =>
    fetch(
      `https://manufacturer-website-server-production-7476.up.railway.app/user/${user.email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then(async (res) => {
      if (res.status === 403 || res.status === 401) {
        localStorage.removeItem("accessToken");
        await signOut(auth);
        Navigate("/");
      }
      return res.json();
    })
  );
  if (isLoading || loading) {
    return <Loading></Loading>;
  }
  if (!userData.role) {
    navigate("/");
  }
  return children;
};

export default RequireAdmin;
