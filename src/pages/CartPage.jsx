import React, { useContext, useEffect } from "react";
import Navbar from "../components/navbar";
import { CartContext } from "../context/CartContext";
import CartCard from "../components/incart";
import { PriceFinder } from "../utilities/pricefinder";
import Sidebar from "../components/SideBar";
import { MenuContext } from "../context/MenuContext";

const CartPage = () => {
  const { cart } = useContext(CartContext);
  const { menu, setMenu } = useContext(MenuContext);
  
  // Calculate total price with error handling
  const totalPrice = cart && cart.length > 0 ? PriceFinder(cart) : 0;
  const deliveryCharges = 29.00;
  const finalAmount = totalPrice + deliveryCharges;

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

  const handleMenuToggle = () => {
    setMenu(prev => !prev);
  };

  const handleSidebarClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <Navbar />
      <main className="flex relative min-h-screen bg-white">
        {/* Sidebar Overlay */}
        <aside
          className={`fixed top-0 left-0 z-20 w-full h-screen bg-[#f7f3f337] transition-opacity duration-300 ${
            menu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleMenuToggle}
        >
          <div
            className={`w-4/5 max-w-[320px] h-full p-4 bg-amber-50 shadow-lg relative flex items-center transition-transform duration-300 ease-in-out overflow-y-auto ${
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

        {/* Main Content */}
        <section className="w-full min-h-screen px-4 py-8 flex justify-center bg-white">
          <div className="w-full max-w-5xl flex flex-col gap-6">
            {/* Cart Items Section */}
            <section className="w-full border p-4 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
                Your Cart
              </h2>
              <div className="flex flex-col gap-4">
                {cart && cart.length > 0 ? (
                  cart.map((product) => (
                    <CartCard product={product} key={product.id} />
                  ))
                ) : (
                  <h1 className="text-center text-gray-500">Your cart is empty</h1>
                )}
              </div>
            </section>

            {/* Checkout Section */}
            {cart && cart.length > 0 && (
              <section className="w-full flex flex-col items-center p-4 rounded-xl">
                <div className="bg-amber-100 p-4 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold text-center sm:text-left mb-3">
                    Checkout
                  </h2>
                  <div className="flex flex-col gap-2 text-base">
                    <span>
                      Total price of products:{" "}
                      <strong>${parseFloat(totalPrice).toFixed(2)}</strong>
                    </span>
                    <span>
                      Delivery charges:{" "}
                      <strong>${deliveryCharges.toFixed(2)}</strong>
                    </span>
                    <span>
                      Final amount:{" "}
                      <strong>${parseFloat(finalAmount).toFixed(2)}</strong>
                    </span>
                  </div>
                  <div className="flex justify-center sm:justify-start mt-4">
                    <button className="px-4 py-2 bg-zinc-200 rounded-xl hover:bg-zinc-300 transition-all hover:cursor-pointer">
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default CartPage;