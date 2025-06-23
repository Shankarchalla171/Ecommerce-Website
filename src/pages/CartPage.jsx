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
      <main className="flex relative min-h-screen bg-white dark:bg-[rgb(20,20,20)] transition-all duration-500 ease-in-out">
        {/* Sidebar Overlay */}
        <Sidebar />
        {/* Main Content */}
        <section className="w-full min-h-screen px-4 py-8 flex justify-center bg-white dark:bg-[rgb(20,20,20)] transition-all duration-500 ease-in-out">
          <div className="w-full max-w-5xl flex flex-col gap-6">
            {/* Cart Items Section */}
            <section className="w-full border p-4 rounded-xl shadow-md dark:border-violet-800 transition-all duration-500 ease-in-out ">
              <h2 className="text-xl font-semibold mb-4 text-center sm:text-left dark:text-gray-300 transition-all duration-500 ease-in-out">
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
              <section className="w-full flex flex-col items-center p-4 sm:p-6">
                <div className="w-full max-w-md bg-white dark:bg-[#1f1d2b] rounded-2xl shadow-xl border border-gray-200 dark:border-violet-800 p-6 
                transition-all duration-500 ease-in-out">

                  <h2 className="text-2xl font-bold text-center sm:text-left mb-5 text-gray-800 dark:text-slate-100 transition-all duration-500 ease-in-out">
                    Checkout
                  </h2>

                  <div className="space-y-3 text-gray-700 dark:text-gray-300 text-base transition-all duration-500 ease-in-out">
                    <div className="flex justify-between">
                      <span>Total price of products:</span>
                      <strong>${parseFloat(totalPrice).toFixed(2)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery charges:</span>
                      <strong>${deliveryCharges.toFixed(2)}</strong>
                    </div>
                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-slate-100 mt-2 transition-all duration-500 ease-in-out">
                      <span>Final amount:</span>
                      <strong>${parseFloat(finalAmount).toFixed(2)}</strong>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center ">
                    <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold  shadow-md hover:shadow-lg transition-all duration-500 ease-in-out">
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