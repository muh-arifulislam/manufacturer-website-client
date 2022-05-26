import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './pages/shared/Header/Header';
import Purchase from './pages/Purchase/Purchase';
import Login from './pages/Login/Login';
import SignUp from './pages/Login/SignUp';
import RequireAuth from './pages/RequireAuth/RequireAuth';
import Dashboard from './pages/Dashboard/Dashboard';
import MyOrder from './pages/Dashboard/MyOrder';
import MyReview from './pages/Dashboard/MyReview';
import MyProfile from './pages/Dashboard/MyProfile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Payment from './pages/Dashboard/Payment';
import Blogs from './pages/Blogs/Blogs';
import MyPortfolio from './pages/MyPortfolio/MyPortfolio';
import NotFound from './pages/NotFound/NotFound';
import Footer from './pages/shared/Footer/Footer';
function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/purchase/:id' element={
          <RequireAuth>
            <Purchase></Purchase>
          </RequireAuth>
        }></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/blogs' element={<Blogs></Blogs>}></Route>
        <Route path='/my-portfolio' element={<MyPortfolio></MyPortfolio>}></Route>
        <Route path='/dashboard' element={
          <RequireAuth>
            <Dashboard></Dashboard>
          </RequireAuth>
        }>
          <Route index element={<MyOrder></MyOrder>}></Route>
          <Route path='review' element={<MyReview></MyReview>}></Route>
          <Route path='my-profile' element={<MyProfile></MyProfile>}></Route>
          <Route path='payment/:id' element={<Payment></Payment>}></Route>
        </Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
