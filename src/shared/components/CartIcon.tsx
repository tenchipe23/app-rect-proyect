import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../../core/services/CartService";

const CartIcon: React.FC = () => {
  const navigate = useNavigate();
  const { totalItems } = useCartStore();

  const openCart = () => {
    navigate("/cart");
  };

  return (
    <div
      className="cart-icon relative cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
      onClick={openCart}
    >
      <FaShoppingCart className="text-2xl text-gray-600" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
