import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../shared/Loading';
import {
    useQuery
} from 'react-query';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ReviewCard from './ReviewCard';
const MyReview = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const titleRef = useRef('');
    const descriptionRef = useRef('');
    const [rating, setRating] = useState(2);
    const { data: reviews, isLoading, refetch } = useQuery('reviews', () => fetch(`http://localhost:5000/review?email=${user.email}`, {
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
    const handleAddReview = () => {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const data = { name: user?.displayName, email: user?.email, title: title, description: description, rating: rating }
        fetch('http://localhost:5000/review', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch();
                }
            })
    }
    if (loading || isLoading) {
        return <Loading></Loading>;
    }
    return (
        <section>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-[30px] gap-[20px] lg:mx-[50px] mx-[10px] justify-items-center	'>
                {
                    reviews?.map(review => <ReviewCard key={review._id} review={review}></ReviewCard>)
                }
            </div>
            <div className='flex justify-center'>
                <label htmlFor="add-review-modal" className="btn modal-button fixed bottom-[20px]">Add Review</label>
            </div>
            {/* modal area  */}
            <div>
                <input type="checkbox" id="add-review-modal" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <div className='flex flex-col items-center'>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={user?.displayName} readOnly />
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mt-[12px]" value={user?.email} readOnly />
                            <input ref={titleRef} type="text" placeholder="Job Title" className="input input-bordered w-full max-w-xs mt-[12px]" />
                            <textarea ref={descriptionRef} className="textarea textarea-bordered w-full max-w-xs mt-[12px]" placeholder="description"></textarea>
                        </div>
                        <div className="flex justify-center mt-[12px]">
                            <button onClick={() => {
                                if (rating > 0) {
                                    setRating(rating - 1)
                                }
                            }} className="btn btn-sm rounded-r-sm">-</button>
                            <input type="text" placeholder="10" className="input-sm w-full max-w-[40px] text-center" value={rating} />
                            <button onClick={() => {
                                if (rating < 5) {
                                    setRating(rating + 1)
                                }
                            }} className="btn btn-sm rounded-l-sm">+</button>
                        </div>
                        <div className="modal-action flex justify-center">
                            <label onClick={handleAddReview} htmlFor="add-review-modal" className="btn">submit</label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyReview;