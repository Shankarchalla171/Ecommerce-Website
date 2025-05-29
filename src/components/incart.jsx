import React, { useContext } from "react";
import { cartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartCard = ({ product }) => {
  const { id, title, price, images } = product;
  const { cartDispatch } = useContext(cartContext);
  const navigate=useNavigate();

  const remove = () => {
    cartDispatch({
      type: 'remove',
      payload: id,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center bg-zinc-100 p-4 rounded-lg shadow-md w-full hover:cursor-pointer">
      {/* Product Image */}
      <div className="w-full sm:w-[200px] flex justify-center sm:justify-start" onClick={()=>(navigate(`/product-page/${id}`))} >
        <img
          src={images}
          alt={title}
          className="rounded max-h-[150px] object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col text-center sm:text-left gap-2">
        <h1 className="text-lg sm:text-xl font-semibold">{title}</h1>
        <h2 className="text-lg sm:text-xl font-bold text-indigo-700">{`$${parseFloat(price).toFixed(2)}`}</h2>
        <button
          onClick={remove}
          className="mt-2 py-2 px-4 bg-zinc-200 rounded-2xl hover:bg-zinc-300 transition-colors text-sm sm:text-base font-semibold w-max hover:cursor-pointer"
        >
          Remove from cart
        </button>
      </div>
    </div>
  );
};

export default CartCard;
