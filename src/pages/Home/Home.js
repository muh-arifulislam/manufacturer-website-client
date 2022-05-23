import React from 'react';
import BusinessSummery from './BusinessSummery';
import HomeReviews from './HomeReviews';
import MyBanner from './MyBanner';
import Tools from './Tools';

const Home = () => {
    return (
        <div>
            <h2 className="text-3xl">this is home</h2>
            <MyBanner></MyBanner>
            <Tools></Tools>
            <BusinessSummery></BusinessSummery>
            <HomeReviews></HomeReviews>
        </div>
    );
};

export default Home;