import React, { useContext } from "react";
import Navbar from "../components/navbar";
import { WishListContext } from "../context/wishList";
import ProductCard from "../components/product-card";
import { MenuContext } from "../context/MenuContext";
import Sidebar from "../components/SideBar";

const WishListPage = () => {
  const { wishList } = useContext(WishListContext);
  const { menu, setMenu } = useContext(MenuContext);

  return (
    <>
      <Navbar />
      <main className="flex relative min-h-screen bg-white justify-center" >
        <aside
          className={`${menu ? "fixed inset-0 z-20 bg-white w-4/5 max-w-xs p-4 shadow-lg flex items-center" : "hidden"
            } `}
        >
          <Sidebar />
        </aside>
        <section className="p-4 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-12 h-max">
          {wishList && wishList.length > 0 ? (
            wishList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <h1 className="col-span-full text-center text-lg font-semibold">
              Your wishlist is empty for now...
            </h1>
          )}
        </section>
      </main>

    </>
  );
};

export default WishListPage;
