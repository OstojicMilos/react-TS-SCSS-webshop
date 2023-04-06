import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Shop = () => {
    return (
        <>
          <Header />
          <main className="main-content">
            <Outlet />
          </main>
        </>
      );
}

export default Shop;