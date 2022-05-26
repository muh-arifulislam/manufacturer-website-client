import React from 'react';

const HomeReview = () => {
    return (
        <div className="card w-[95%] mx-auto bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
                        <img src="https://api.lorem.space/image/face?hash=3174" />
                    </div>
                </div>
                <p className='text-center'>"We are using cookies for no reason."</p>
            </div>
        </div>
    );
};

export default HomeReview;