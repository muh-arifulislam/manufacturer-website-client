import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
const AddProduct = () => {
    const [user] = useAuthState(auth);
    const { register, formState: { error }, reset, handleSubmit } = useForm();
    const imageStorageKey = "e4bf472a55ff06bc63e4826dd38bdc31";
    const onSubmit = async data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        console.log(image);
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const product = {
                        name: data.name,
                        price: data.price,
                        quantity: data.quantity,
                        minOrder: data.minOrder,
                        description: data.description,
                        image: img,
                    }
                    fetch(`https://polar-gorge-51199.herokuapp.com/tool?email=${user.email}`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success('Product added Successfully');
                                reset();
                            }
                        })
                }
            })
    };
    return (
        <section className='flex justify-center mt-[20px]'>
            <div className="card flex-shrink-0 w-full lg:max-w-xl max-w-xs shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center">Add Product</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-[12px]">
                        <div className="form-control">
                            <input {...register("name")} type="text" placeholder="product name" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-[12px]">
                            <input {...register("price")} type="text" placeholder="product price" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-[12px]">
                            <input {...register("quantity")} type="text" placeholder="avaiable quantity" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-[12px]">
                            <input {...register("minOrder")} type="text" placeholder="minimum order quantity" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-[12px]">
                            <textarea {...register("description")} className="textarea textarea-bordered" placeholder="product description" required></textarea>
                        </div>
                        <div className="form-control mt-[12px]">
                            <input
                                type="file"
                                className="input input-bordered w-full max-w-xl"
                                {...register("image", {
                                    required: {
                                        value: true,
                                        message: 'Image is Required'
                                    }
                                })}
                                required />
                        </div>
                        <div className="form-control  mt-[12px]">
                            <input className="btn btn-primary" type="submit" value="Add Product" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddProduct;