import React from 'react';
import banner1 from '../../images/banner/banner1.jpg';
import banner2 from '../../images/banner/banner2.jpg';
import banner3 from '../../images/banner/banner3.jpg';
import { Carousel } from 'react-responsive-carousel';
const MyBanner = () => {
    return (
        <section>

            <Carousel showThumbs={false} showArrows={true} autoPlay={true} infiniteLoop>
                <div>
                    <img src={banner1} alt="" />
                </div>
                <div>
                    <img src={banner2} alt="" />
                </div>
                <div>
                    <img src={banner3} alt="" />
                </div>
            </Carousel>
        </section>
    );
};

export default MyBanner;