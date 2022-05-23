import React, { useRef, useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import SocialLogin from './SocialLogin';

const SignUp = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [error1, setError1] = useState('');
    const navigate = useNavigate();
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');
    if (user || gUser) {
        navigate('/')
    }
    const handleSignUp = (event) => {
        event.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        const passRex = /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[\d|@#$!%*?&])[\p{L}\d@#$!%*?&]{8,96}$/gmu
        if (!passRex.test(password)) {
            setError1('You should add minimum 1 uppercase, 1 lowercase, 1 digit and password must be minimum 8 character')
        }
        else {
            console.log('hoy nai')
        }
    }
    const handleGoogleLogin = () => {
        signInWithGoogle();
    }
    const handleFacebookLogin = () => {
        console.log('facebook login')
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-full">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSignUp}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input ref={nameRef} type="email" placeholder="name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input ref={emailRef} type="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input ref={passwordRef} type="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input ref={confirmPasswordRef} type="password" placeholder="confirm password" className="input input-bordered" required />
                            </div>
                            <div>
                                <p>Already Registerd    ? <Link to='/login' className='text-primary' >Login</Link></p>
                                {
                                    error1 && <p className='text-center mt-[10px] text-red-600'><small >{error1}</small></p>
                                }
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className='btn btn-primary' value="Sign Up" />
                            </div>
                        </form>
                        <SocialLogin
                            handleGoogleLogin={handleGoogleLogin}
                            handleFacebookLogin={handleFacebookLogin}
                        >
                        </SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;