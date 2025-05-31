import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { findProduct } from "../utilities/findproduct";
import { WishListContext } from "../context/wishList";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const { id, title, price, images } = product;
  const navigate = useNavigate();
  const { wishList, setWishList } = useContext(WishListContext);
  const { cart, cartDispatch } = useContext(CartContext);
  const {islogged}=useContext(AuthContext)

  const inCart = findProduct(cart, id);
  const inWishList = findProduct(wishList, id);

  const goToProduct = () => {
    navigate(`/product-page/${id}`);
  };

  const toggleWishList = () => {
    if(!islogged){
        navigate('/login');
    }else  if (inWishList) {
      setWishList(wishList.filter((product) => product.id !== id));
    } else {
      setWishList([...wishList, product]);
    }
  };

  const handleCartAction = () => {
    if(!islogged){
       navigate('/login');
    }else if (inCart) {
      navigate("/cart");
    } else {
      cartDispatch({
        type: "ADD",
        payload: product,
      });
    }
  };
   

  const wishIconClass = inWishList
    ? "material-icons absolute top-2 right-2 text-red-500 text-2xl cursor-pointer"
    : "material-symbols-outlined absolute top-2 right-2 text-white text-2xl cursor-pointer";

  return (
    <div className="bg-amber-200 p-4 rounded-xl w-full max-w-sm hover:scale-[1.03] transform transition duration-200 shadow-md mx-auto">
      <div className="w-full aspect-square relative overflow-hidden rounded-xl">
        <img
          src={Array.isArray(images) ? images[0] : images}
          alt={title}
          className="w-full h-full object-cover rounded-xl cursor-pointer"
          onClick={goToProduct}
        />
        <span className={wishIconClass} onClick={toggleWishList}>
          favorite
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <h1 className="font-bold text-xl text-gray-900">
          ${parseFloat(price).toFixed(2)}
        </h1>
        <button
          className="p-2 bg-zinc-100 mt-2 rounded-xl hover:bg-zinc-200 flex justify-center items-center gap-2 transition cursor-pointer"
          onClick={handleCartAction}
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
  );
};

export default ProductCard;