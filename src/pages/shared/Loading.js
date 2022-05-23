import React from 'react';

const Loading = () => {
    return (
        <div className='h-[80vh] flex justify-center'>
            <progress class="progress w-56"></progress>
        </div>
    );
};

export default Loading;