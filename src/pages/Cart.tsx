import { useNavigate } from "react-router-dom";
import { useGetApi } from "../hooks/useApi";
import { CartItem } from "../models/cartItem";
import { apiService } from "../services/apiService";

const Cart = () => {
    const { data: items, setData: setItems } = useGetApi<CartItem[]>('cart');
    const navigate = useNavigate();

    async function deleteCartItem(productId: string) {
        await apiService.delete(`cart/items/${productId}`);
        
        setItems((prev: CartItem[]) => prev.filter(i => i.product._id !== productId));
    }

    async function createOrder() {
        await apiService.post('orders', {});

        navigate('/shop/orders');
    }

    return (
        <div className="cart">
            <h1>Your Cart</h1>
            { items?.map(item => 
                <div className="cart-item" key={item._id}>
                    <span className="cart-item__title">Title: {item.product.title}</span>
                    <span>Price: {item.product.price}</span>
                    <span>Quantity: {item.quantity}</span>
                    <button className="btn" onClick={() => deleteCartItem(item.product._id)}>Delete</button>
                </div>
            )}
            { !!items?.length && <button className="btn" onClick={createOrder}>Create Order</button> }
        </div>
    );
}

export default Cart;