import React from 'react';
import profile from '../../images/profile.png';
import facebook from '../../images/icons/facebook (2).png';
import twitter from '../../images/icons/twitter.png';
import linkedIn from '../../images/icons/linkedin.png';
import github from '../../images/icons/github.png';
import graduation from '../../images/icons/graduation-hat.png';
import skill from '../../images/icons/skills.png';
import warehouse from '../../images/warehouse.JPG';
import doctorsPortal from '../../images/doctors-portal.JPG';
import productAnalysis from '../../images/product-analysis.JPG';
const MyPortfolio = () => {
    return (
        <>
            <div className='bg-accent pb-[50px]'>
                <section className='bg-slate-200'>
                    <div class="hero min-h-screen">
                        <div class="hero-content flex-col lg:flex-row-reverse">
                            <img className='rounded-[50%]' src={profile} />
                            <div className=''>
                                <h1 class="lg:text-[60px] text-3xl font-bold">Md. Ariful Islam</h1>
                                <h2 className='lg:text-[30px] text-sm font-bold lg:mt-[15px] mt-0'>Jr. Web Developer (MERN Stack)</h2>
                                <p className='w-full max-w-lg mt-[12px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore corrupti, quisquam odit adipisci saepe nulla hic quia temporibus laudantium dolore.</p>
                                <p className='mt-[12px] font-bold'>Email: ariful.islam20234@gmail.com</p>
                                <div className='flex mt-[12px]'>
                                    <a href="https://www.facebook.com/muh.arifulislam" target="_blank" rel="noreferrer">
                                        <img className='w-[20px]' src={facebook} alt="" />
                                    </a>
                                    <a href="https://www.facebook.com/muh.arifulislam" target="_blank" rel="noreferrer" className='ml-[10px]'>
                                        <img className='w-[20px]' src={twitter} alt="" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/muh-arifulislam/" target="_blank" rel="noreferrer" className='ml-[10px]'>
                                        <img className='w-[20px]' src={linkedIn} alt="" />
                                    </a>
                                    <a href="https://github.com/muh-arifulislam" target="_blank" rel="noreferrer" className='ml-[10px]'>
                                        <img className='w-[20px]' src={github} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div class="hero min-h-screen bg-slate-400">
                        <div class="hero-content flex-col lg:flex-row">
                            <img className='w-full lg:max-w-sm max-w-xs' src={graduation} alt="" />
                            <div>
                                <h1 class="lg:text-2xl text-lg font-bold">Computer Science and Technology</h1>
                                <p class="lg:text-xl text-lg">Session: 2018-2019</p>
                                <p class="lg:text-4xl text-xl">Cumilla Polytechnic Institute</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div class="flex flex-col w-full lg:flex-row">
                        <div class="grid flex-grow h-full card rounded-box place-items-center">
                            <ul class="steps steps-vertical lg:py-[50px] py-[20px]">
                                <li class="step step-primary font-bold">HTML5, CSS3</li>
                                <li class="step step-primary font-bold">Bootstrap, Tailwind, DaisyUI</li>
                                <li class="step step-primary font-bold">JavaScript, React.Js, Reack Hooks</li>
                                <li class="step step-primary font-bold">Node.JS, Express.JS, MongoDB</li>
                                <li class="step step-primary font-bold">Firebase, Heroku, Github</li>
                                <li class="step font-bold">Redux, MaterialUI</li>
                            </ul>
                        </div>
                        <div class="divider lg:divider-horizontal"></div>
                        <div class="grid flex-grow h-full card rounded-box place-items-center lg:py-[50px] py-[20px]">
                            <img className='w-full lg:max-w-sm max-w-xs' src={skill} alt="" />
                        </div>
                    </div>
                </section>
                <section className='lg:mx-[100px] mx-[20px]'>
                    <h1 className='text-5xl font-bold text-center my-[50px]'>Projects</h1>
                    <div class="card card-compact w-full bg-base-100 shadow-xl mx-auto">
                        <figure><img src={warehouse} alt="Shoes" /></figure>
                        <div class="card-body">
                            <a href="https://warehouse-management-web-2c9f4.web.app/" target="_blank" rel="noopener noreferrer" className='text-2xl font-bold my-[30px] text-center link text-primary'>Live Site: Click Here</a>
                        </div>
                    </div>
                    <div class="card card-compact w-full bg-base-100 shadow-xl mx-auto mt-[50px]">
                        <figure><img src={doctorsPortal} alt="Shoes" /></figure>
                        <div class="card-body">
                            <a href="https://doc-dent-portal.web.app/" target="_blank" rel="noopener noreferrer" className='text-2xl font-bold  my-[30px] text-center link text-primary'>Live Site: Click Here</a>
                        </div>
                    </div>
                    <div class="card card-compact w-full bg-base-100 shadow-xl  my-[50px]">
                        <figure><img src={productAnalysis} alt="Shoes" /></figure>
                        <div class="card-body">
                            <a href="https://product-analysis-by-react.netlify.app/" target="_blank" rel="noopener noreferrer" className='text-2xl font-bold  my-[30px] text-center link text-primary'>Live Site: Click Here</a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default MyPortfolio;