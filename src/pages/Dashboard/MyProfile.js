import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
const axios = require('axios').default;
const MyProfile = () => {
    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState({});
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
    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5000/user/${user.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(function (response) {
                // handle success
                setUserData(response.data);
            })
                .catch(function (error) {
                    // handle error
                    console.log(error.message, 'hei');
                })
        }
    }, [user])
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
        console.log(data)
        axios.put('http://localhost:5000/user', data, {
            headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const { register, handleSubmit: handleImageSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <section className=' p-4'>
            {/* profile picture area  */}
            <div className='flex items-center justify-center gap-[15px]'>
                <div className="avatar">
                    <div className="lg:w-[150px] w-[100px] rounded-full">
                        <img src="https://api.lorem.space/image/face?hash=92310" />
                    </div>
                </div>
                {
                    (userData.profilePicture) ? <div className='flex flex-col gap-[8px]'>
                        <input type="file" name="arif" id="" />
                        <button className="btn btn-primary btn-sm px-[15px] normal-case">Edit Picture</button>
                    </div> :
                        <div >
                            <form onSubmit={handleImageSubmit(onSubmit)}>
                                <input type="file" {...register("image")} name="" id="" />
                                <input type="submit" className="btn btn-primary btn-sm px-[15px] normal-case" value="Upload Picture" />
                            </form>
                        </div>
                }
            </div>
            <div className='flex flex-col items-center'>
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