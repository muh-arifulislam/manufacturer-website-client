import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
const ReviewCard = ({ review }) => {
    const { description, rating } = review;
    const ratingNum = parseInt(rating);
    let ratingIcon = [];
    for (let i = 0; i < ratingNum; i++) {
        ratingIcon.push(<FontAwesomeIcon icon={faStar}></FontAwesomeIcon>)
    }
    return (
        <div className="card lg:w-96 w-[95%] bg-base-100 shadow-xl">
            <div className="card-body">
                <p className='text-center'>"{description}"</p>
                <h4 className='text-lg'>Rating: {ratingIcon}</h4>
            </div>
        </div>
    );
};

export default ReviewCard;