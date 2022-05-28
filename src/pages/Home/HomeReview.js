import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import user from '../../images/user.png';
const HomeReview = ({ review }) => {
    const { name, rating, description, image } = review;
    const ratingNum = parseInt(rating);
    let ratingIcon = [];
    for (let i = 0; i < ratingNum; i++) {
        ratingIcon.push(<FontAwesomeIcon icon={faStar} key={i}></FontAwesomeIcon>)
    }
    return (
        <div className="card w-[95%] max-w-xl mx-auto bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
                        <img src={image ? image : user} />
                    </div>
                </div>
                <p><span className='mr-[5px] font-bold'>Rating:</span>
                    {
                        ratingIcon
                    }
                </p>
                <p className='text-center'>{description}</p>
                <p className='font-bold'>{name}</p>
            </div>
        </div>
    );
};

export default HomeReview;