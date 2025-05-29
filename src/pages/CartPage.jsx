import React, { useContext } from "react";
import Navbar from "../components/navbar";
import { cartContext } from "../context/CartContext";
import CartCard from "../components/incart";
import { PriceFinder } from "../utilies/pricefinder";
import Sidebar from "../components/SideBar";
import { MenuContext } from "../context/MenuContext";
const CartPage = () => {
  const { cart } = useContext(cartContext);
  const toatalPrice = PriceFinder(cart);
  const { menu, setMenu } = useContext(MenuContext);

  return (
    <>
      <Navbar />
      <main className="flex relative min-h-screen bg-white">
        <aside
          className={`${menu ? "fixed inset-0 z-20 bg-white w-4/5 max-w-xs p-4 shadow-lg flex items-center" : "hidden"
            } `}
        >
          <Sidebar />
        </aside>
        <section className="w-full min-h-screen px-4 py-8 flex justify-center bg-white">
          <div className="w-full max-w-5xl flex flex-col gap-6">
            {/* Cart Items */}
            <section className="w-full border-1 p-4 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">Your Cart</h2>
              <div className="flex flex-col gap-4">
                {cart.length > 0 ? (
                  cart.map((product) => (
                    <CartCard product={product} key={product.id} />
                  ))
                ) : (
                  <h1 className="text-center text-gray-500">Your cart is empty</h1>
                )}
              </div>
            </section>

            {/* Checkout Section */}
            {cart.length > 0 && (
              <section className="w-full flex flex-col items-center p-4 rounded-xl ">
                <div className=" bg-amber-100 p-4 rounded-xl shadow-md">
                  <h2 className="text-xl font-semibold text-center sm:text-left mb-3">Checkout</h2>
                  <div className="flex flex-col gap-2 text-base">
                    <span>Total price of products: <strong>${parseFloat(toatalPrice).toFixed(2)}</strong></span>
                    <span>Delivery charges: <strong>$29.00</strong></span>
                    <span>
                      Final amount: <strong>${parseFloat(toatalPrice + 29).toFixed(2)}</strong>
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
