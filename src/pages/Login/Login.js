import React, { useRef } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../shared/Loading';
import SocialLogin from './SocialLogin';

const Login = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    if (user || gUser) {
        navigate('/')
    }
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const handleLogin = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password);

    }
    const handleGoogleLogin = () => {
        signInWithGoogle();
    }
    const handleFacebookLogin = () => {
        console.log('facebook login')
    }
    if (loading || gLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-full max-w-xl">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input ref={emailRef} type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input ref={passwordRef} type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                <div>
                                    <p>Are you new? <Link to='/signup' className='text-primary' >Create Account</Link></p>
                                    <p>
                                        {
                                            error && error.message
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className='btn btn-primary' value="Login" />
                            </div>
                        </form>
                        <SocialLogin
                            handleGoogleLogin={handleGoogleLogin}
                            handleFacebookLogin={handleFacebookLogin}
                        ></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;