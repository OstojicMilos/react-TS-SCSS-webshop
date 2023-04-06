import { NavLink, useNavigate } from "react-router-dom";
import useUserInfo from "../hooks/useUserInfo";

const Header = () => {
    const userInfo = useUserInfo();
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('userInfo');
        navigate('/login');
    }

    const links = userInfo?.role === 'admin' ? 
    [
        { path: "/admin/add-product", text: 'Add Product' },
        { path: "/admin/products", text: 'Products' },
    ] :
    [
        { path: "/shop/products", text: 'Shop' },
        { path: "/shop/cart", text: 'Cart' },
        { path: "/shop/orders", text: 'Orders' },
    ];

    return (
        <header className="header">
            <ul className="header__item-list">
                { links.map(link => 
                    <li className="header__item" key={link.path}>
                        <NavLink to={link.path}>{link.text}</NavLink>
                    </li>)}
                <li className="header__item"><a onClick={logoutHandler}>Sign Out</a></li>
            </ul>
        </header>
    );
}

export default Header;