import React from 'react';
import BusinessSummery from './BusinessSummery';
import DealerReq from './DealerReq';
import GlobalStandard from './GlobalStandard';
import HomeReviews from './HomeReviews';
import MyBanner from './MyBanner';
import Tools from './Tools';

const Home = () => {
    return (
        <div className='bg-accent'>
            <MyBanner></MyBanner>
            <Tools></Tools>
            <BusinessSummery></BusinessSummery>
            <GlobalStandard></GlobalStandard>
            <HomeReviews></HomeReviews>
            <DealerReq></DealerReq>
        </div>
    );
};

export default Home;