import React, { useContext } from "react";
import Navbar from "../components/navbar";
import { WishListContext } from "../context/wishList";
import ProductCard from "../components/product-card";
import { MenuContext } from "../context/MenuContext";
import Sidebar from "../components/SideBar";

const WishListPage = () => {
  const { wishList } = useContext(WishListContext) || { wishList: [] };
  const { menu, setMenu } = useContext(MenuContext) || { menu: false, setMenu: () => {} };

  // Validate and filter wishlist items
  const validWishListItems = Array.isArray(wishList) 
    ? wishList.filter(product => 
        product && 
        product.id && 
        product.title && 
        product.price !== undefined
      )
    : [];

  const handleMenuToggle = () => {
    if (typeof setMenu === 'function') {
      setMenu(prev => !prev);
    }
  };

  const handleMenuClose = (e) => {
    e.stopPropagation();
    handleMenuToggle();
  };

  const renderEmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <span className="material-symbols-outlined text-8xl text-zinc-300 mb-6 block">
          favorite_border
        </span>
        <h1 className="text-2xl font-bold text-zinc-700 mb-4">
          Your Wishlist is Empty
        </h1>
        <p className="text-zinc-500 text-lg mb-6">
          Start adding products to your wishlist to see them here!
        </p>
        <a 
          href="/products" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 font-medium"
        >
          <span className="material-symbols-outlined">
            shopping_bag
          </span>
          Browse Products
        </a>
      </div>
    </div>
  );

  const renderWishListItems = () => (
    <>
      <div className="col-span-full mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-amber-600">
              favorite
            </span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-zinc-800">
                My Wishlist
              </h1>
              <p className="text-zinc-600">
                {validWishListItems.length} {validWishListItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {validWishListItems.map((product) => (
        <div key={product.id} className="relative">
          <ProductCard product={product} />
        </div>
      ))}
    </>
  );

  return (
    <>
      <Navbar />
      <main className="flex relative min-h-screen bg-white">
        {/* Mobile Sidebar Overlay */}
        <aside
          className={`fixed top-0 left-0 z-20 w-full h-screen bg-[#f7f3f337] transition-opacity duration-300
                      ${menu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onClick={handleMenuClose}
        >
          <div
            className={`w-4/5 max-w-[320px] h-full p-4 bg-amber-50 shadow-lg flex items-center transition-transform duration-300 ease-in-out
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

        {/* Main Content */}
        <section className="flex-1 w-full">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-8">
              {validWishListItems.length > 0 ? renderWishListItems() : renderEmptyState()}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default WishListPage;