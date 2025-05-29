import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/navbar";
import { useNavigate, useParams } from "react-router-dom";
import { cartContext } from "../context/CartContext";
import ProductCard from "../components/product-card";
import { findProduct } from "../utilies/findproduct";
import Sidebar from "../components/SideBar";
import { MenuContext } from "../context/MenuContext";

const API_BASE = "https://api.escuelajs.co/api/v1";

const ProductPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const { cart, cartDispatch } = useContext(cartContext);
  const [activeimg, setActiveImg] = useState(0);
  const { menu, setMenu } = useContext(MenuContext);

  const inCart = findProduct(cart, product.id);

  const getProduct = async () => {
    try {
      const res = await fetch(`${API_BASE}/products/${params.p_id}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRelated = async () => {
    try {
      const res = await fetch(`${API_BASE}/products/${params.p_id}/related`);
      const data = await res.json();
      setRelated(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = () => {
    if (inCart) {
      navigate("/cart");
    } else {
      cartDispatch({
        type: "ADD",
        payload: product,
      });
    }
  };

  useEffect(() => {
    getProduct();
    getRelated();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveImg(0); // Reset to first image on new product load
  }, [params.p_id]);

  return (
    <>
      <Navbar />
      <main className="flex relative min-h-screen bg-white">
        <aside
          className={`${menu ? "fixed inset-0 z-20 bg-white w-4/5 max-w-xs p-4 shadow-lg flex items-center" : "hidden"} `}
        >
          <Sidebar />
        </aside>

        <section className="flex-1 w-full sm:ml-0">
          <div className="w-full flex justify-center p-2">
            <section className="w-full max-w-6xl bg-zinc-100 mt-10 flex flex-col md:flex-row gap-6 md:gap-8 p-4 md:p-10 rounded-xl border-1">
              {/* Images Section */}
              <div className="flex flex-col md:flex-row md:w-1/2 gap-4">
                {product.images && (
                  <div className="flex md:flex-col gap-4 justify-center items-center">
                    {product.images.slice(0, 3).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index}`}
                        onClick={() => setActiveImg(index)}
                        className={`w-14 h-14 rounded-md object-cover cursor-pointer transition-all duration-200
                      ${activeimg === index
                            ? "ring-2 ring-amber-500 scale-105 shadow-md"
                            : "opacity-80 hover:opacity-100"}`}
                      />
                    ))}
                  </div>
                )}
                {product.images && (
                  <div className="flex justify-center items-center md:w-[80%] rounded-xl">
                    <img
                      src={product.images[activeimg]}
                      alt=""
                      className="w-full max-h-[400px] object-contain rounded-2xl hover:cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="bg-amber-50 p-4 flex flex-col gap-5 md:w-1/2 rounded-2xl">
                {product.title && (
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                    {product.title}
                  </h1>
                )}

                {product.category && (
                  <span className="px-4 py-2 bg-zinc-200 w-max rounded-3xl text-sm sm:text-base">
                    {product.category.name}
                  </span>
                )}

                {product.description && (
                  <p className="text-sm sm:text-base md:text-lg">
                    {product.description}
                  </p>
                )}

                {product.price && (
                  <div className="flex justify-between items-center px-2 mt-4">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold">
                      {`$${parseFloat(product.price).toFixed(2)}`}
                    </span>
                    <button
                      className="bg-zinc-200 px-4 py-2 rounded-3xl hover:bg-zinc-300 transition text-sm sm:text-base hover:cursor-pointer flex items-center gap-2"
                      onClick={addToCart}
                    >
                      <span className="material-symbols-outlined">
                        {inCart ? "check_circle" : "add_shopping_cart"}
                      </span>
                      <span className="text-[16px] font-semibold capitalize">
                        {inCart ? "go to cart" : "add to cart"}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Related Products */}
          <div className="m-4 mt-8">
            <h2 className="text-xl sm:text-2xl mb-4">Related Products:</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
              {related.length > 0 &&
                related.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
            </section>
          </div>
        </section>
      </main>


    </>
  );
};

export default ProductPage;
