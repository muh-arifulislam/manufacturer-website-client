import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
const DealerReq = () => {
    const { register, reset, handleSubmit } = useForm();
    const onSubmit = data => {
        fetch('https://polar-gorge-51199.herokuapp.com/message', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success("your message sent successfully");
                    reset();
                }
            })
    };
    return (
        <section className=' lg:mt-[149px] mt-[129px] bg-slate-600 lg:py-[65px] py-[81px]'>
            <h2 className='text-3xl text-center text-white'>Sent Your Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mt-[41px]">
                <input {...register("name")} type="text" placeholder="Your Name" className="input lg:w-full w-[90%] max-w-sm" required />
                <input {...register("email")} type="text" placeholder="Email Address" className="input lg:w-full w-[90%] max-w-sm mt-[19px]" required />
                <input {...register("subject")} type="text" placeholder="Subject" className="input lg:w-full w-[90%] max-w-sm mt-[19px]" required />
                <textarea {...register("message")} className="textarea lg:w-full w-[90%] max-w-sm mt-[19px]" placeholder="Your message"></textarea>
                <input className='btn btn-primary mt-[35px] px-[35px]' type="submit" required />
            </form>
        </section>
    );
};

export default DealerReq;