import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/navbar";
import ProductCard from "../components/product-card";
import { useParams } from "react-router-dom";
import Sidebar from "../components/SideBar";
import { MenuContext } from "../context/MenuContext";

const API_BASE = "https://api.escuelajs.co/api/v1";

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { menu, setMenu } = useContext(MenuContext);

  // Prevent background scrolling when sidebar is open
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menu]);

  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!params.category_id) {
        throw new Error("Category ID is required");
      }

      const response = await fetch(`${API_BASE}/categories/${params.category_id}/products`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      setError(error.message || "Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [params.category_id]);

  const handleMenuToggle = () => {
    setMenu(prev => !prev);
  };

  const handleSidebarClick = (e) => {
    e.stopPropagation();
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="col-span-full flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading products...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="col-span-full flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Error: {error}</div>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="col-span-full flex justify-center items-center h-64">
          <h1 className="text-lg text-gray-600">No products found for this category</h1>
        </div>
      );
    }

    return products.map((product) => (
      <ProductCard product={product} key={product.id} />
    ));
  };

  return (
    <>
      <Navbar />
      <main className="flex relative min-h-screen bg-white justify-center">
        {/* Sidebar Overlay */}
        <aside
          className={`fixed top-0 left-0 z-20 w-full h-screen bg-[#f7f3f337] transition-opacity duration-300 ${
            menu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleMenuToggle}
        >
          <div
            className={`w-4/5 max-w-[320px] h-full p-4 bg-amber-50 shadow-lg flex items-center relative transition-transform duration-300 ease-in-out overflow-y-auto ${
              menu ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={handleSidebarClick}
          >
            <button
              title="Go back"
              className="p-2 rounded-full absolute top-0 right-0 hover:cursor-pointer z-20"
               onClick={handleMenuToggle}
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>

            <Sidebar />
          </div>
        </aside>

        {/* Products Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12 p-4 sm:p-6 md:p-8 w-full max-w-7xl">
          {renderContent()}
        </section>
      </main>
    </>
  );
};

export default CategoryProduct;