import React, { useEffect, useState } from 'react';
import Loading from '../shared/Loading';
import Tool from './Tool';

const Tools = () => {
    const [tools, setTools] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/tool')
            .then(res => res.json())
            .then(data => {
                setTools(data);
            })
    }, []);
    return (
        <section id="tools" className='mt-[100px] lg:mx-[50px] mx-[20px]'>
            <h2 className='text-5xl font-bold text-center'>Tools</h2>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-[30px] gap-[15px]'>
                {
                    tools.map(tool => <Tool key={tool._id} tool={tool}></Tool>)
                }
            </div>
        </section>
    );
};

export default Tools;