import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./pages/shared/Header/Header";
import Purchase from "./pages/Purchase/Purchase";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Login/SignUp";
import RequireAuth from "./pages/RequireAuth/RequireAuth";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyOrder from "./pages/Dashboard/MyOrder";
import MyReview from "./pages/Dashboard/MyReview";
import MyProfile from "./pages/Dashboard/MyProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Payment from "./pages/Dashboard/Payment";
import Blogs from "./pages/Blogs/Blogs";
import MyPortfolio from "./pages/MyPortfolio/MyPortfolio";
import NotFound from "./pages/NotFound/NotFound";
import Footer from "./pages/shared/Footer/Footer";
import ManageOrder from "./pages/Dashboard/ManageOrder";
import AddProduct from "./pages/Dashboard/AddProduct";
import MakeAdmin from "./pages/Dashboard/MakeAdmin";
import ManageProducts from "./pages/Dashboard/ManageProducts";
import RequireAdmin from "./pages/RequireAdmin/RequireAdmin";
import AllProducts from "./pages/AllProducts/AllProducts";
function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/products" element={<AllProducts></AllProducts>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/purchase/:id"
          element={
            <RequireAuth>
              <Purchase></Purchase>
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/blogs" element={<Blogs></Blogs>}></Route>
        <Route
          path="/my-portfolio"
          element={<MyPortfolio></MyPortfolio>}
        ></Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }
        >
          <Route index element={<MyOrder></MyOrder>}></Route>
          <Route path="review" element={<MyReview></MyReview>}></Route>
          <Route path="my-profile" element={<MyProfile></MyProfile>}></Route>
          <Route path="payment/:id" element={<Payment></Payment>}></Route>
          <Route
            path="manage-orders"
            element={
              <RequireAdmin>
                <ManageOrder></ManageOrder>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="add-product"
            element={
              <RequireAdmin>
                <AddProduct></AddProduct>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="make-admin"
            element={
              <RequireAdmin>
                <MakeAdmin></MakeAdmin>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="manage-products"
            element={
              <RequireAdmin>
                <ManageProducts></ManageProducts>
              </RequireAdmin>
            }
          ></Route>
        </Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
}

export default App;
