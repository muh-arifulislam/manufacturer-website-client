import React from 'react';
import image from '../../images/manu.jpg';
const GlobalStandard = () => {
    return (
        <section className='my-[50px]'>
            <div className="hero min-h-screen bg-white">
                <div className="hero-content flex-col lg:flex-row gap-[30px]">
                    <img src={image} className="lg:w-full w-[90%] max-w-sm  lg:h-[400px] rounded-lg shadow-2xl" alt='' />
                    <div>
                        <div className='w-full max-w-xl'>
                            <h2 className='text-3xl font-bold'>The Global Leader In the Industry and Manufacturing of Innovative</h2>
                            <p>Ztech Corp. a Manufacturing Services Provider inducstries Suitable For Factory. Manufacturing, industry, Engineering, Connections And Any Related Industry Career Field</p>
                            <div className='lg:flex items-center'>
                                <div>
                                    <h2 className='text-xl font-bold'> Providing Innovative Website Solution For Future</h2>
                                    <div className='mx-[20px]'>
                                        <li>We are use Quality Manufacturing Materials</li>
                                        <li>Ztech Provide Unique Technology</li>
                                        <li>Group of Certified and Experience Team</li>
                                        <li>The Best Service of Multiple Industries</li>
                                    </div>
                                </div>
                                <div>
                                    <button className='btn btn-primary'>Read More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GlobalStandard;