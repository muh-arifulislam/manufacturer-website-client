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
                    fetch(`http://localhost:5000/tool?email=${user.email}`, {
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
                                console.log(inserted);
                                reset();
                            }
                        })
                }
            })
    };
    return (
        <section className='flex justify-center'>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <input {...register("name")} type="text" placeholder="product name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <input {...register("price")} type="text" placeholder="product price" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <input {...register("quantity")} type="text" placeholder="avaiable quantity" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <input {...register("minOrder")} type="text" placeholder="minimum order quantity" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <textarea {...register("description")} className="textarea textarea-bordered" placeholder="product description" required></textarea>
                        </div>
                        <div className="form-control">
                            <input
                                type="file"
                                className="input input-bordered w-full max-w-xs"
                                {...register("image", {
                                    required: {
                                        value: true,
                                        message: 'Image is Required'
                                    }
                                })}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Add Product" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddProduct;