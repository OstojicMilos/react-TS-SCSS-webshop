import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../models/product";
import { apiService } from "../services/apiService";

type Inputs = {
    _id: string;
    title: string,
    description: string,
    imageUrl: string,
    price: number,
};

const ProductForm = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (productId) {
            setIsEditMode(true);
            fetchProductAndResetForm(productId);
        }
    }, [productId]);

    const fetchProductAndResetForm = async (id: string) => {
        const product = await apiService.get<Product>(`products/${id}`);
        reset(product);
    };

    const onSubmit: SubmitHandler<Inputs> = product => {
        const operation = isEditMode ? apiService.put(`admin/products/${productId}`, product)
            : apiService.post('admin/products', product);
        operation.then(() => {
            navigate('/admin/products')
        }).catch(error => {
            console.log(error)
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <h1 className="form__title">{isEditMode ? 'Edit' : 'Add'} Product</h1>
            {isEditMode && <input type="hidden" defaultValue={productId} {...register("_id")} />}
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input {...register("title", { required: 'Title is required' })} />
                {errors.title && <span className="error-message">{errors.title.message}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="imageUrl">Image Url</label>
                <input {...register("imageUrl", { required: 'Image url is required' })} />
                {errors.imageUrl && <span className="error-message">{errors.imageUrl.message}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input {...register("price", { required: 'Price is required' })} />
                {errors.price && <span className="error-message">{errors.price.message}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea {...register("description")} />
            </div>
            <button className="btn">Save</button>
        </form>
    );
}

export default ProductForm;