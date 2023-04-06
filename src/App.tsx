import { Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import ProductForm from './pages/ProductForm';
import AdminProducts from './pages/AdminProducts';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import { useEffect } from 'react';

function App() {
  const handleUnauthorizedEvent = () => {
    window.location.assign("/login");
  };

  useEffect(() => {
    window.addEventListener("unauthorized", handleUnauthorizedEvent);
    
    return () => window.removeEventListener("unauthorized", handleUnauthorizedEvent);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="shop/*" element={<PrivateRoute roles={['user']} />}>
          <Route element={<Shop />}>
            <Route path="products" element={<Products />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>
        <Route path="admin/*" element={<PrivateRoute roles={['admin']} />}>
          <Route element={<Shop />}>
            <Route path="products/:productId/update" element={<ProductForm />} />
            <Route path="add-product" element={<ProductForm />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
