import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useGetApi } from "../hooks/useApi";
import { Product } from "../models/product";
import { apiService } from "../services/apiService";

const AdminProducts = () => {
    const { data: products, isLoading, setData: setProducts } = useGetApi<Product[]>('products');
    const navigate = useNavigate();

    const editProduct = (product: Product) => {
        navigate(`/admin/products/${product._id}/update`);
    }

    const deleteProduct = (product: Product) => {
        apiService.delete(`admin/products/${product._id}`).then(() => {
            setProducts((curr: Product[]) => curr.filter(p => p._id !== product._id));
        });
    }

    const cardButtons = [
        { text: 'Edit', handler: editProduct },
        { text: 'Delete', handler: deleteProduct }
    ];

    return (
        <div className="shop">
            { isLoading && 'Fetching products...'}
            { products?.map(product => 
                <Card key={product._id} 
                      product={product} 
                      buttons={cardButtons} />)}
        </div>
    );
}

export default AdminProducts;