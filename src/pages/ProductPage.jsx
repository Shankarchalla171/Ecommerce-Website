import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/navbar";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/product-card";
import { findProduct } from "../utilities/findproduct";
import Sidebar from "../components/SideBar";
import { MenuContext } from "../context/MenuContext";
import { findQuantity } from "../utilities/findQuantity";
import { AuthContext } from "../context/AuthContext";

const API_BASE = "https://api.escuelajs.co/api/v1";

const ProductPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, cartDispatch } = useContext(CartContext);
  const [activeimg, setActiveImg] = useState(0);
  const { menu, setMenu } = useContext(MenuContext);
  const [quantity, setQuantity] = useState(0);
  const {islogged}=useContext(AuthContext);

  const inCart = findProduct(cart, product?.id);

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

  const getProduct = async () => {
    if (!params?.p_id) {
      setError("Product ID not found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/products/${params.p_id}`);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch product: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (!data || !data.id) {
        throw new Error("Invalid product data received");
      }
      
      setProduct(data);
      setQuantity(findQuantity(cart, data.id) || 0);
    } catch (error) {
      setError(error.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const getRelated = async () => {
    if (!params?.p_id) return;

    try {
      const res = await fetch(`${API_BASE}/products?limit=8`);
      
      if (res.ok) {
        const data = await res.json();
        // Filter out current product and limit to 4 related items
        const filteredData = Array.isArray(data) 
          ? data.filter(item => item?.id && item.id !== parseInt(params.p_id)).slice(0, 4)
          : [];
        setRelated(filteredData);
      }
    } catch (error) {
      // Silently fail for related products as they're not critical
      setRelated([]);
    }
  };

  const addToCart = () => {
    if (!product?.id) return;
    if(!islogged){
      navigate('/login');
    }else if (inCart) {
      navigate("/cart");
    } else {
      cartDispatch({
        type: "ADD",
        payload: product,
      });
      setQuantity(1);
    }
  };

  const handleIncrement = () => {
    if (!product?.id) return;
    
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    cartDispatch({
      type: 'INCREASE',
      payload: product.id,
    });
  };

  const handleDecrement = () => {
    if (!product?.id || quantity <= 0) return;
    
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    
    if (newQuantity > 0) {
      cartDispatch({
        type: 'DECREASE',
        payload: product.id,
      });
    } else {
      cartDispatch({
        type: 'REMOVE',
        payload: product.id,
      });
    }
  };

  useEffect(() => {
    if (params?.p_id) {
      getProduct();
      getRelated();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveImg(0);
    }
  }, [params?.p_id]);

  // Update quantity when cart changes
  useEffect(() => {
    if (product?.id) {
      const currentQuantity = findQuantity(cart, product.id) || 0;
      setQuantity(currentQuantity);
    }
  }, [cart, product?.id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex relative min-h-screen bg-white">
          <div className="flex-1 w-full flex items-center justify-center">
            <div className="text-xl">Loading...</div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="flex relative min-h-screen bg-white">
          <div className="flex-1 w-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl text-red-600 mb-4">Error: {error}</div>
              <button 
                onClick={() => navigate('/')} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Go Back Home
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex relative min-h-screen bg-white">
        <aside
          className={`fixed top-0 left-0 z-20 w-full h-screen bg-[#f7f3f337] transition-opacity duration-300
                      ${menu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onClick={() => setMenu(prev => !prev)}
        >
          <div
            className={`w-4/5 max-w-[320px] h-full p-4 bg-amber-50 shadow-lg flex relative items-center transition-transform duration-300 ease-in-out
                 ${menu ? "translate-x-0" : "-translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              title="Go back"
              className="p-2 rounded-full absolute top-0 right-0 hover:cursor-pointer z-20"
              onClick={() => setMenu(prev => !prev)}
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>

            <Sidebar />
          </div>
        </aside>

        <section className="flex-1 w-full sm:ml-0">
          <div className="w-full flex justify-center p-2">
            <section className="w-full max-w-6xl bg-zinc-100 mt-10 flex flex-col md:flex-row gap-6 md:gap-8 p-4 md:p-10 rounded-xl border-1">
              {/* Images Section */}
              <div className="flex flex-col md:flex-row md:w-1/2 gap-4">
                {product?.images && Array.isArray(product.images) && product.images.length > 0 && (
                  <div className="flex md:flex-col gap-4 justify-center items-center">
                    {product.images.slice(0, 3).map((img, index) => (
                      <img
                        key={index}
                        src={img || '/placeholder-image.jpg'}
                        alt={`${product.title || 'Product'} thumbnail ${index + 1}`}
                        onClick={() => setActiveImg(index)}
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                        className={`w-14 h-14 rounded-md object-cover cursor-pointer transition-all duration-200
                      ${activeimg === index
                            ? "ring-2 ring-amber-500 scale-105 shadow-md"
                            : "opacity-80 hover:opacity-100"}`}
                      />
                    ))}
                  </div>
                )}
                {product?.images && Array.isArray(product.images) && product.images.length > 0 && (
                  <div className="flex justify-center items-center md:w-[80%] rounded-xl">
                    <img
                      src={product.images[activeimg] || '/placeholder-image.jpg'}
                      alt={product.title || 'Product image'}
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                      className="w-full max-h-[400px] object-contain rounded-2xl hover:cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="bg-amber-50 p-4 flex flex-col gap-5 md:w-1/2 rounded-2xl">
                {product?.title && (
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                    {product.title}
                  </h1>
                )}

                {product?.category?.name && (
                  <span className="px-4 py-2 bg-zinc-200 w-max rounded-3xl text-sm sm:text-base">
                    {product.category.name}
                  </span>
                )}

                {product?.description && (
                  <p className="text-sm sm:text-base md:text-lg">
                    {product.description}
                  </p>
                )}

                {product?.price !== undefined && product?.price !== null && (
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center px-2 mt-4">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold">
                      ${parseFloat(product.price || 0).toFixed(2)}
                    </span>

                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <div className="flex items-center gap-2 bg-zinc-200 px-4 py-2 rounded-3xl hover:bg-zinc-300 transition text-sm sm:text-base">
                        <button 
                          onClick={handleDecrement} 
                          disabled={quantity <= 0}
                          className="material-symbols-outlined hover:scale-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          do_not_disturb_on
                        </button>
                        <span className="min-w-[20px] text-center">{quantity}</span>
                        <button 
                          onClick={handleIncrement} 
                          className="material-symbols-outlined hover:scale-110 transition"
                        >
                          add_circle
                        </button>
                      </div>

                      <button
                        className="flex items-center gap-2 bg-zinc-200 px-4 py-2 rounded-3xl hover:bg-zinc-300 transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={addToCart}
                        disabled={!product?.id}
                      >
                        <span className="material-symbols-outlined">
                          {inCart ? "check_circle" : "add_shopping_cart"}
                        </span>
                        <span className="text-[16px] font-semibold capitalize">
                          {inCart ? "go to cart" : "add to cart"}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Related Products */}
          {related && related.length > 0 && (
            <div className="m-4 mt-8">
              <h2 className="text-xl sm:text-2xl mb-4">Related Products:</h2>
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {related.map((relatedProduct) => (
                  relatedProduct?.id ? (
                    <ProductCard product={relatedProduct} key={relatedProduct.id} />
                  ) : null
                ))}
              </section>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default ProductPage;