import React from 'react';
import HomeReview from './HomeReview';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {
    useQuery
} from 'react-query';
import Loading from '../shared/Loading';
const HomeReviews = () => {
    const { data: reviews, isLoading, refetch } = useQuery('all-reviews', () => fetch(`http://localhost:5000/reviews`)
        .then(async (res) => {
            return res.json();
        }))
    if (isLoading) {
        return <Loading></Loading>;
    }
    return (
        <section className='mt-[100px] lg:mx-[50px] mx-[20px]'>
            <h1 className='text-5xl text-center text-white '>Customer Reviews</h1>
            {/* <div className='grid lg:grid-cols-3 grid-cols-1 gap-[30px] mt-[50px]'>
                
            </div> */}
            <Carousel showThumbs={false} showArrows={true} autoPlay={true} infiniteLoop className='mt-[50px]'>
                {
                    reviews.map(review => <HomeReview key={review._id} review={review}></HomeReview>)
                }
            </Carousel>
        </section>
    );
};

export default HomeReviews;