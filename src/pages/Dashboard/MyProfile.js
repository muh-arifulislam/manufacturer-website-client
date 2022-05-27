import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import {
    useQuery
} from 'react-query';
import { signOut } from 'firebase/auth';
import Loading from '../shared/Loading';
const axios = require('axios').default;
const MyProfile = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [institute, setInstitute] = useState('');
    const [educationFromYear, setEducationFromYear] = useState('');
    const [educationToYear, setEducationToYear] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const { data: userData, isLoading, refetch } = useQuery('user', () => fetch(`http://localhost:5000/user/${user.email}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(async (res) => {
            if (res.status === 403 || res.status === 401) {
                localStorage.removeItem('accessToken');
                await signOut(auth);
                navigate('/login');
            }
            return res.json();
        }))
    if (user) {
        refetch()
    }
    useEffect(() => {
        if (userData) {
            const { email, name, linkedIn, institute, session, number, city, zip, country } = userData;
            setFullName(name);
            setEmail(email);
            setLinkedIn(linkedIn);
            setInstitute(institute);
            setEducationFromYear(session?.educationFromYear);
            setEducationToYear(session?.educationToYear);
            setNumber(number);
            setCity(city);
            setZip(zip);
            setCountry(country);
        }

    }, [userData, user])
    const handleSubmit = () => {
        const data = { fullName, email, linkedIn, institute, educationFromYear, educationToYear, number, city, zip, country };
        axios.put('http://localhost:5000/user', data, {
            headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
            .then(function (response) {
                refetch();
                toast.success("Your profile information updated Successfully");
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const { register, formState: { error }, reset, handleSubmit: handleImageSubmit } = useForm();
    const imageStorageKey = "e4bf472a55ff06bc63e4826dd38bdc31";
    const onSubmit = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        console.log(image);
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.success) {
                    const image = result.data.url;
                    fetch(`http://localhost:5000/user/image/${userData._id}?email=${user.email}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify({ image })
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.modifiedCount > 0) {
                                toast.success('Profile Picture added Successfully');
                                reset();
                            }
                        })
                }
            })
    };
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <section className=' p-4'>
            {/* profile picture area  */}
            <div className='flex lg:flex-row flex-col items-center justify-center gap-[15px]'>
                <div className="avatar">
                    <div className="lg:w-[150px] w-[100px] rounded-full">
                        <img src={userData.image} alt="profile picture" />
                    </div>
                </div>
                <div>
                    <form onSubmit={handleImageSubmit(onSubmit)} className="flex flex-col">
                        <input type="file" {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is Required'
                            }
                        })} required />
                        <input type="submit" className="btn btn-primary btn-sm px-[15px] normal-case mt-[12px]" value="Upload Picture" />
                    </form>
                </div>
            </div>
            <div className='flex flex-col items-center mt-[12px]'>
                <div className='w-full max-w-xl'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Full Name</span>
                        </label>
                        <input onChange={(event) => setFullName(event.target.value)} type="text" placeholder="name" className="input input-bordered" value={fullName} />
                    </div>
                    <div className="form-control mt-[12px]">
                        <label className="label">
                            <span className="label-text font-bold">Email</span>
                        </label>
                        <input type="text" placeholder="email" className="input input-bordered" value={email} readOnly />
                    </div>
                    <div className="form-control mt-[12px] ">
                        <label className="label">
                            <span className="label-text font-bold">LinkedIn Profile Link</span>
                        </label>
                        <input onChange={(e) => setLinkedIn(e.target.value)} type="text" placeholder="linkedin" className="input input-bordered" value={linkedIn} />
                    </div>
                    <div className="lg:flex items-end gap-[30px]  mt-[12px]">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Last Institute</span>
                            </label>
                            <input onChange={(e) => setInstitute(e.target.value)} type="text" placeholder="institute" className="input input-bordered" value={institute} />
                        </div>
                        <div className="form-control w-full lg:mt-[0] mt-[12px]">
                            <div className='flex items-center'>
                                <input onChange={(e) => setEducationFromYear(e.target.value)} type="text" placeholder="from" className="input input-bordered w-full max-w-auto" value={educationFromYear} />
                                <p className='text-lg mx-[10px] font-bold'>year</p>
                                <input onChange={(e) => setEducationToYear(e.target.value)} type="text" placeholder="to" className="input input-bordered  w-full max-w-auto" value={educationToYear} />
                            </div>
                        </div>
                    </div>
                    <div className="form-control  mt-[12px]">
                        <label className="label">
                            <span className="label-text font-bold">Number</span>
                        </label>
                        <input onChange={(e) => setNumber(e.target.value)} type="text" placeholder="number" className="input input-bordered" value={number} />
                    </div>
                </div>
                <div className='w-full max-w-xl lg:flex justify-between gap-[30px]  mt-[12px]'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">City</span>
                        </label>
                        <input onChange={(e) => setCity(e.target.value)} type="text" placeholder="city" className="input input-bordered" value={city} />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text  font-bold">Zip Code</span>
                        </label>
                        <input onChange={(e) => setZip(e.target.value)} type="text" placeholder="zip" className="input input-bordered" value={zip} />
                    </div>
                </div>
                <div className="form-control w-full max-w-xl  mt-[12px]">
                    <label className="label">
                        <span className="label-text font-bold">Country</span>
                    </label>
                    <input onChange={(e) => setCountry(e.target.value)} type="text" placeholder="country" className="input input-bordered" value={country} />
                </div>
                <div className="form-control w-full max-w-xl  mt-[12px]">
                    <div className='flex justify-end gap-[30px]'>
                        <button onClick={() => navigate('/')} className='btn normal-case btn-outline'>Back to Home</button>
                        <button onClick={handleSubmit} className='btn normal-case btn-primary'>Save Changes</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyProfile;