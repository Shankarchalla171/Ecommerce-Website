import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Category from "../components/catageroy";
import ProductCard from "../components/product-card";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import { MenuContext } from "../context/MenuContext";

const API_BASE = "https://api.escuelajs.co/api/v1";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [sampleProducts, setSampleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { menu, setMenu } = useContext(MenuContext);
  const navigate = useNavigate();

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

  const getSampleProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/products?offset=0&limit=8`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSampleProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch(`${API_BASE}/categories`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      await Promise.all([getCategories(), getSampleProducts()]);
    } catch (error) {
      setError(error.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMenuToggle = () => {
    setMenu(prev => !prev);
  };

  const handleSidebarClick = (e) => {
    e.stopPropagation();
  };

  const goToProductsPage = () => {
    navigate("/products");
  };

  // Filter categories to show only first 5
  // const displayCategories = categories.filter(category =>
  //   category && category.id && parseInt(category.id) <= 5
  // );
  
  // console.log(categories);
  // console.log(displayCategories);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex justify-center items-center min-h-screen bg-white dark:bg-[rgb(20,20,20)]">
          <div className="text-lg text-gray-600 dark:text-gray-300">Loading...</div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="flex justify-center items-center min-h-screen bg-white">
          <div className="text-lg text-red-600">Error: {error}</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex relative min-h-screen bg-white dark:bg-[rgb(20,20,20)] transition-all duration-500 ease-in-out">
        {/* Sidebar Overlay */}
        <Sidebar />

        {/* Main Content */}
        <section className="flex-1 w-full sm:ml-0">
          {/* Categories Section */}
          <section className="p-4 sm:p-6 md:p-8 flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 bg-blue-100 p-4 rounded-xl w-full max-w-7xl dark:bg-transparent transition-all duration-500 ease-in-out">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Category cate={category} key={category.id} />
                ))
              ) : (
                <div className="col-span-full text-center">
                  <h2 className="text-gray-600">No categories found</h2>
                </div>
              )}
            </div>
          </section>

          {/* Sample Products Section */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12 p-4 sm:p-6 md:p-8">
            {sampleProducts.length > 0 &&
              sampleProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}

            {/* View More Products Button */}
            {sampleProducts.length > 0 && (
              <div className="bg-gradient-to-r from-indigo-200 via-violet-100 to-blue-200  p-4 rounded flex justify-between items-center col-span-full dark:bg-transparent dark:text-gray-300 dark:border-1 transition-all duration-500 ease-in-out">
                <span className="capitalize font-semibold text-base sm:text-lg text-indigo-900">View more products</span>
                <button
                  onClick={goToProductsPage}
                  className="p-2 hover:bg-amber-300 rounded-full transition-colors duration-200"
                  aria-label="View more products"
                >
                  <span className="material-symbols-outlined text-amber-900">
                    chevron_right
                  </span>
                </button>
              </div>
            )}
          </section>
        </section>
      </main>
    </>
  );
};

export default Home;