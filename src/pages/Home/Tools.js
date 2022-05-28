import React, { useEffect, useState } from 'react';
import Loading from '../shared/Loading';
import Tool from './Tool';

const Tools = () => {
    const [tools, setTools] = useState([]);
    useEffect(() => {
        fetch('https://polar-gorge-51199.herokuapp.com/tool')
            .then(res => res.json())
            .then(data => {
                setTools(data);
            })
    }, []);
    return (
        <section id="tools" className='mt-[50px] lg:mx-[50px] mx-[20px]'>
            <h2 className='text-5xl font-bold text-center text-white mb-[100px]'>Tools</h2>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-[30px] gap-[15px]'>
                {
                    tools.map(tool => <Tool key={tool._id} tool={tool}></Tool>)
                }
            </div>
        </section>
    );
};

export default Tools;