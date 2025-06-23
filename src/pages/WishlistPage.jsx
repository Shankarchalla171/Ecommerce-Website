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
              <h1 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-gray-300">
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
      <main className="flex relative min-h-screen bg-white dark:bg-[rgb(20,20,20)] transition-all duration-500 ease-in-out">
        {/* Mobile Sidebar Overlay */}
        <Sidebar />
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