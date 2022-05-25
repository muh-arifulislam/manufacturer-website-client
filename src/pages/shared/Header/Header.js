import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { signOut } from 'firebase/auth';
const Header = () => {
    const [user] = useAuthState(auth);
    const location = useLocation();
    const path = location.pathname;
    return (
        <nav className="navbar bg-base-100 lg:px-20 py-5">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl" href='/'>daisyUI</a>
            </div>
            <div className="lg:flex-none  hidden lg:flex md:flex">
                <ul className="menu menu-horizontal p-0">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/appointment'>Appointment</Link></li>
                    <li><Link to='/reviews'>Reviews</Link></li>
                    <li><Link to='/contact-us'>Contact us</Link></li>
                    {
                        user ? <>
                            <li><Link to='dashboard'>Dashboard</Link></li>
                            <button onClick={() => {
                                localStorage.removeItem('accessToken');
                                signOut(auth);
                            }} className='btn text-white'>Sign Out</button>
                        </> : <>
                            {
                                (path === "/login") ? <Link to='/signup'><button className='btn text-white'>Sign Up</button></Link> :
                                    <Link to='/login'><button className='btn text-white'>Login</button></Link>
                            }
                        </>
                    }
                </ul>
            </div>
            <div className="flex-none">
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/about'>About</Link></li>
                            <li><Link to='/appointment'>Appointment</Link></li>
                            <li><Link to='/reviews'>Reviews</Link></li>
                            <li><Link to='/contact-us'>Contact us</Link></li>
                            <li><Link to='/login'>Login</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;