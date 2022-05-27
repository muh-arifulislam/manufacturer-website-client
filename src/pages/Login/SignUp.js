import React, { useRef, useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import SocialLogin from './SocialLogin';
import { useForm } from "react-hook-form";
import useToken from '../../hooks/useToken';
const SignUp = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateProfileError] = useUpdateProfile(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [error1, setError1] = useState('');
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const token = useToken(user || gUser);
    if (token) {
        navigate('/')
    }
    const onSubmit = async (data) => {
        console.log(data)
        const { email, displayName, password, confirmPassword } = data;
        const passValidate = /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[\d|@#$!%*?&])[\p{L}\d@#$!%*?&]{8,96}$/gmu
        if (!passValidate.test(password)) {
            setError1('You should add minimum 1 uppercase, 1 lowercase, 1 digit and password must be minimum 8 character')
        }
        else {
            if (password !== confirmPassword) {
                setError1('Your password and confirm password did not matched!!')
            }
            else {
                await createUserWithEmailAndPassword(email, password);
                await updateProfile({ displayName });


            }
        }
    };
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("displayName")} placeholder="name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email")} type="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password")} type="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input {...register("confirmPassword")} type="password" placeholder="confirm password" className="input input-bordered" required />
                            </div>
                            <div>
                                <p>Already Registerd    ? <Link to='/login' className='text-primary' >Login</Link></p>
                                {
                                    error1 && <p className='text-center mt-[10px] text-red-600'><small >{error1}</small></p>
                                }
                                {
                                    error && <p className='text-center mt-[10px] text-red-600'><small >{error.message}</small></p>
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