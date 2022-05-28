import React from 'react';

const Blogs = () => {
    return (
        <section className='lg:p-[100px] p-[20px] bg-accent'>
            {/* first question answer */}
            <div class="card w-full bg-base-100 shadow-xl lg:pt-[50px] pt-[30px]">
                <div class="card-body">
                    <h2 class="card-title">How will you improve the performance of React application</h2>
                    <p className='list-decimal'>There are several ways to improve the performance of the React application.
                        <li className='ml-5'>
                            Using Immutable data structure.
                            <p className='ml-5'>Data immulatibilty which comes from the functional programming world, can be applied to the design of front-end apps. Ot have many benefits,
                                <li>Zero side Effects</li>
                                <li>Immutable data object are simples to create, test and use.</li>
                                <li>
                                    Helps prevent temponal coupling.
                                </li>
                                <li>
                                    Easier to track changes
                                </li>
                            </p>
                        </li>
                        <li className='ml-5'>
                            Function stateless components
                            <p className='ml-5'>
                                In React, there are two different ways of optimizing React apps at the componet level. Function componets prevent constructing class instances while reducing the overfall bundle size as it minifies better than classes
                            </p>
                        </li>
                        <li className='ml-5'>
                            Dependency optimization
                            <p className='ml-5'>
                                When considering optimizing the application bundle size, it's worth checking how much code you are actually utilizing from dependencies
                            </p>
                        </li>
                    </p>
                </div>
            </div>
            {/* third question answer */}
            <div class="card w-full bg-base-100 shadow-xl lg:mt-[50px] mt-[30px]">
                <div class="card-body">
                    <h2 class="card-title">  What are the different ways to manage a state in a React application?</h2>
                    <p>
                        There are many different ways in React application to manage a state. We can use several React hooks to manage the state. <br />
                        Firstly, the common hooks is React useState hook. when we call useState hook, it's give us two distuctured item. One is for store the state value and another one is state value updating function. Note a things, when we call the useState hook we have to provide a intialize value or null on the hook function. <br />
                        Secondly, we can manage state using React <span className='font-bold'>useRef</span> hook. Here's we have to do that, first declare a variable by calling useRef hook. Then we need to use this variable in input field by <span className='font-bold'>ref</span> attribute.
                    </p>
                </div>
            </div>
            {/* third question answer */}
            <div class="card w-full bg-base-100 shadow-xl lg:mt-[50px] mt-[30px]">
                <div class="card-body">
                    <h2 class="card-title"> How does prototypical inheritance work?</h2>
                    <p >In javascrit, an object can inherit properties of another object. The object from where the properties are inherited is named prototype. <br />
                        Protypes is connected in a chain. An object can have a prototype, and that prototype by itself can have another prototype and so on in chain. When accessing a property myObject.myProp, javascript looks for myProp inside the own properties of myObjectt, then in the prototype of the object, then in the prototype's. and so on until in encounters null as the prototypes
                    </p>
                </div>
            </div>
            {/* fourth question answer */}
            <div class="card w-full bg-base-100 shadow-xl lg:my-[50px] my-[30px] ">
                <div class="card-body">
                    <h2 class="card-title"> What is a unit test? Why should write unit tests?</h2>
                    <p > <span className='font-bold'>What is Unit Test?</span> <br />
                        Unit test is a type of software testing where individual units and components are tested. The purpose of unit test is validate each unit of software code expected. Unit test is done during the development of an application by the developers. A unit may be an individual function, method or object. <br />
                        <span className='font-bold'>Why should write unit test?</span>
                        <br />
                        Unit test is important because developers sometimes tray saving time doing minimal unit testing. There are many reason for uni test,
                        <li className='ml-5'>Unit tests help to fix bugs early in the development cycle.</li>
                        <li className='ml-5'>
                            It helps developers to understand the testing code.
                        </li>
                        <li className='ml-5'>
                            Unit test help code re-use
                        </li>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Blogs;