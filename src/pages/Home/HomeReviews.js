import React from 'react';
import HomeReview from './HomeReview';

const HomeReviews = () => {
    return (
        <section className='mt-[100px] lg:mx-[50px] mx-[20px]'>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-[30px]'>
                <HomeReview></HomeReview>
                <HomeReview></HomeReview>
                <HomeReview></HomeReview>
            </div>
        </section>
    );
};

export default HomeReviews;