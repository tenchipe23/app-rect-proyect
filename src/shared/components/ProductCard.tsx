import React, { useState } from "react";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import { useCartStore } from "../../core/services/CartService";
import { useAlertStore } from "../../core/services/alertStore";
import { useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../../core/services/FavoritesStore";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  imageUrl: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { show: showAlert } = useAlertStore();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoritesStore();
  const [isWishlisted, setIsWishlisted] = useState(isFavorite(product.id));
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    try {
      const isAlreadyInCart = useCartStore.getState().isInCart(product.id);

      addToCart(product, quantity);

      showAlert({
        message: isAlreadyInCart
          ? `Cantidad actualizada: "${product.name}" (${
              useCartStore
                .getState()
                .items.find((item) => item.id === product.id)?.quantity ||
              quantity
            } en carrito)`
          : `${quantity} ${product.name} agregado(s) al carrito`,
        type: "success",
        duration: 2000,
      });

      setQuantity(1);
    } catch (error) {
      console.error("Error adding product to cart", error);
      showAlert({
        message: "No se pudo agregar el producto al carrito",
        type: "error",
        duration: 2000,
      });
    }
  };

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromFavorites(product.id);
      setIsWishlisted(false);
    } else {
      addToFavorites(product);
      setIsWishlisted(true);
    }
  };

  const handleQuickView = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="
        relative 
        bg-white 
        rounded-xl 
        shadow-[0_10px_20px_rgba(0,0,0,0.1)] 
        overflow-hidden 
        w-[300px] 
        m-3.5 
        border 
        border-[#e0e0e0] 
        transition-all 
        duration-300 
        ease-in-out 
        hover:-translate-y-2.5 
        hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)]
        pb-12
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Descuento */}
      {product.discount && (
        <div
          className="
            absolute 
            top-2.5 
            right-2.5 
            bg-[#ff6b6b] 
            text-white 
            py-1 
            px-2.5 
            rounded-full 
            font-bold 
            z-10
          "
        >
          {product.discount}% OFF
        </div>
      )}

      {/* Contenedor de Imagen */}
      <div
        className="
          relative 
          h-[250px] 
          overflow-hidden
        "
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="
            w-full 
            h-full 
            object-cover 
            transition-transform 
            duration-300 
            ease-in-out 
            group-hover:scale-110
          "
        />

        {/* Acciones Rápidas */}
        {isHovered && (
          <div
            className="
              absolute 
              bottom-2.5 
              left-0 
              right-0 
              flex 
              justify-center 
              opacity-100 
              transition-opacity 
              duration-300 
              ease-in-out
            "
          >
            <button
              onClick={handleQuickView}
              className="text-gray-600 hover:text-blue-500 transition-colors p-10"
              title="Ver detalles del producto"
            >
              <FaEye />
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`text-${
                isWishlisted ? "red" : "gray"
              }-500 hover:text-${isWishlisted ? "red" : "gray"}-600 transition-colors p-10`}
            >
              <FaHeart />
            </button>
          </div>
        )}
      </div>

      {/* Detalles del Producto */}
      <div className="p-3.5 text-left">
        <h3 className="m-0 mb-2.5 text-[1.1em] text-[#333]">{product.name}</h3>

        {/* Precios */}
        <div className="flex items-center mb-2.5">
          <span
            className={`
              text-[1.3em] 
              font-bold 
              text-[#007bff] 
              mr-2.5
              ${product.originalPrice ? "with-discount" : ""}
            `}
          >
            ${product.price.toFixed(2)}
          </span>

          {product.originalPrice && (
            <span
              className="
                line-through 
                text-[#999] 
                text-[0.9em]
              "
            >
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <p className="text-[#666] mb-3.5 text-[0.9em]">{product.description}</p>

        {/* Quantity Selector */}
        <div className="flex items-center justify-center mt-4 space-x-2">
          <button
            onClick={decrementQuantity}
            className="bg-gray-200 px-3 py-1 rounded-l-md hover:bg-gray-300"
          >
            -
          </button>
          <span className="bg-white border px-4 py-1">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="bg-gray-200 px-3 py-1 rounded-r-md hover:bg-gray-300"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="
            w-full 
            mt-4 
            bg-blue-500 
            text-white 
            py-2 
            rounded-md 
            hover:bg-blue-600 
            transition-colors 
            flex 
            items-center 
            justify-center
          "
        >
          <FaShoppingCart className="mr-2" /> Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
