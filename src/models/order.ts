import { CartItem } from "./cartItem";
import UserInfo from "./userInfo";

export interface Order {
    _id: string;
    user: UserInfo;
    products: CartItem[];
}