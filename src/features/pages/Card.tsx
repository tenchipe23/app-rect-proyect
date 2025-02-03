import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModernMenu } from "../../shared/components/ModernMenu";
import Footer from "../../shared/components/Footer";
import { CallToAction } from "../../shared/components/CallToAction";
import { useCartStore } from "../../core/services/CartService";
import { CartItem } from "../../core/services/CartService"; 
import { footerLinks } from "../../shared/utils/FooterLinks";

const EmptyCartState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
      <p className="text-gray-600 mb-6">
        ¡Agrega productos y empieza a comprar!
      </p>
      <button
        onClick={() => navigate("/products")}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Ir a Productos
      </button>
    </div>
  );
};

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.imageUrl || "default-image.png"}
          alt={item.name}
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h3 className="font-bold">{item.name}</h3>
          {item.selectedVariant && (
            <p className="text-sm text-gray-500">
              Variante: {item.selectedVariant}
            </p>
          )}
          <p className="text-blue-600 font-semibold">
            ${item.price.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            min="1"
            max="10"
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            className="w-12 text-center border-x"
          />
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
          >
            +
          </button>
        </div>

        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          Eliminar
        </button>

        <p className="font-bold">${(item.price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

const Cart: React.FC = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const shippingCost = totalPrice > 1000 ? 0 : 99.99;
  const totalWithShipping = totalPrice + shippingCost;

  const handleCheckout = () => {
    // Implement checkout logic
    setIsCheckingOut(true);
    // You can add more complex checkout process here
  };

  if (items.length === 0) {
    return (
      <>
        <ModernMenu />
        <div className="container mx-auto px-4 py-60 flex items-center justify-center">
        <EmptyCartState />
        </div>
        
        <Footer
          companyName="Mi Empresa"
          currentYear={new Date().getFullYear()}
          footerLinks={footerLinks}
        />
      </>
    );
  }

  return (
    
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <ModernMenu />
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold mb-6">
            Carrito de Compras ({items.length} productos)
          </h2>
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
          <div className="mt-4 flex justify-between">
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700"
            >
              Vaciar Carrito
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-lg p-15">
          <h3 className="text-xl font-bold mb-4">Resumen de Compra</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>
                {shippingCost === 0
                  ? "¡Envío Gratis!"
                  : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>${totalWithShipping.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="
              w-full 
              mt-6 
              bg-green-500 
              text-white 
              py-3 
              rounded 
              hover:bg-green-600 
              transition-colors
              disabled:opacity-50
            "
          >
            {isCheckingOut ? "Procesando..." : "Continuar Compra"}
          </button>
          <div className="mt-4 text-center text-sm text-gray-500">
            {totalPrice > 1000
              ? "¡Felicidades! Tienes envío gratis"
              : `Agrega $${(1000 - totalPrice).toFixed(
                  2
                )} más para envío gratis`}
          </div>
        </div>
      </div>

      <CallToAction
        variant="minimal"
        title="¿Necesitas Ayuda?"
        description="Nuestro equipo de soporte está listo para asistirte"
        buttonText="Contactar Soporte"
      />

      <Footer
        companyName="Mi Empresa"
        currentYear={new Date().getFullYear()}
        footerLinks={footerLinks}
      />
    </div>
  );
};

export default Cart;
