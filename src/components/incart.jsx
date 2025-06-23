import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartCard = ({ product }) => {
  const { id, title, price, images, quantity } = product;
  const { cartDispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const handleRemove = () => {
    cartDispatch({
      type: 'REMOVE',
      payload: id,
    });
  };

  const handleImageClick = () => {
    navigate(`/product-page/${id}`);
  };

  const handleIncrement=()=>{
    cartDispatch({
      type:'INCREASE',
      payload:id,
    })
  }
  
  const handleDecrement=()=>{
    cartDispatch({
      type:'DECREASE',
      payload:id,
    })
  }
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center bg-zinc-100 p-4 rounded-lg shadow-md w-full dark:bg-[rgb(45,44,44)]">
      {/* Product Image */}
      <div
        className="w-full sm:w-[200px] flex justify-center sm:justify-start cursor-pointer"
        onClick={handleImageClick}
      >
        <img
          src={Array.isArray(images) ? images[0] : images}
          alt={title}
          className="rounded max-h-[150px] object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col text-center sm:text-left gap-2">
        <h1 className="text-lg sm:text-xl font-semibold dark:text-gray-300">{title}</h1>
        <h2 className="text-lg sm:text-xl font-bold text-indigo-700 dark:text-cyan-300">
          ${parseFloat(price).toFixed(2)}
        </h2>
        <div className="flex flex-col items-center sm:flex-row sm:gap-7 ">
          <button
            className="mt-2 py-2 px-4 bg-zinc-200 rounded-2xl hover:bg-zinc-300 transition-colors text-sm sm:text-base font-semibold w-max cursor-pointer flex items-center gap-4
             dark:bg-[#703BF7] dark:text-white dark:hover:bg-[#472399]"
          >
            <span class="material-symbols-outlined"
               onClick={handleDecrement}
            >
              do_not_disturb_on
            </span>
            <span>{quantity}</span>
            <span class="material-symbols-outlined"
               onClick={handleIncrement}
            >
              add_circle
            </span>
          </button>
          <button
            onClick={handleRemove}
            className="mt-2 py-2 px-4 bg-zinc-200 rounded-2xl hover:bg-zinc-300 transition-colors text-sm sm:text-base font-semibold w-max cursor-pointer dark:bg-[#703BF7] dark:text-white dark:hover:bg-[#472399]"
          >
            Remove from cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;