import { useGetApi } from "../hooks/useApi";
import { CartItem } from "../models/cartItem";
import { Order } from "../models/order";

const Orders = () => {
    const { data: orders } = useGetApi<Order[]>('orders');

    const calculateTotal = (products: CartItem[]) => {
        let total = 0;
        for (let product of products) 
            total += product.quantity*product.product.price;
        return total;
    }

    return (
        <div className="orders">
            <h1>Your Orders</h1>
            {orders?.map(order =>
                <div className="order" key={order._id}>
                    {order.products.map(item =>
                        <div className="order__product" key={item._id}>
                            <span className="cart-item__title">Title: {item.product.title}</span>
                            <span>Price: {item.product.price}</span>
                            <span>Quantity: {item.quantity}</span>
                        </div>
                    )}
                    <div className="order__total">Total price: {calculateTotal(order.products)}</div>
                </div>)}
        </div>
    );
}

export default Orders;