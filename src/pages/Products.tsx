import Card from "../components/Card";
import { useGetApi } from "../hooks/useApi";
import { Product } from "../models/product";
import { apiService } from "../services/apiService";

const Products = () => {
    const { data: products, isLoading } = useGetApi<Product[]>('products');

    const addToCart = (product: Product) => {
        apiService.post('cart', { productId: product._id });
    }

    const cardButtons = [
        { text: 'Add to Cart', handler: addToCart }
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

export default Products;