import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { ModernMenu } from '../../shared/components/ModernMenu';
import Footer from '../../shared/components/Footer';
import { useCartStore } from '../../core/services/CartService';
import { DEFAULT_PRODUCTS } from '../../shared/data/ProductData';
import { footerLinks } from '../../shared/utils/FooterLinks'; 

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  // Find the product by ID (replace with actual data fetching logic)
  const product = DEFAULT_PRODUCTS.find(p => p.id === Number(productId));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <ModernMenu />
        <div className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center bg-white shadow-lg rounded-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Producto no encontrado</h1>
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center justify-center mx-auto bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              <FaArrowLeft className="mr-2" /> Volver al inicio
            </button>
          </div>
        </div>
        <Footer
          companyName="Mi Empresa"
          currentYear={new Date().getFullYear()}
          footerLinks={footerLinks}
        />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ModernMenu />
      
      <div className="flex-grow container mx-auto px-4 py-20">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center text-gray-600 hover:text-blue-500 transition"
        >
          <FaArrowLeft className="mr-2" /> Volver
        </button>

        <div className="grid md:grid-cols-2 gap-12 bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Product Image */}
          <div className="bg-gray-100 flex items-center justify-center p-8">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="max-w-full max-h-[500px] object-contain rounded-lg shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="p-8 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{product.description}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </div>
              {product.originalPrice && (
                <div className="text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Cantidad:</span>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-100 px-3 py-2 hover:bg-gray-200 transition"
                >
                  <FaMinus />
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  readOnly 
                  className="w-16 text-center py-2 focus:outline-none"
                />
                <button 
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="bg-gray-100 px-3 py-2 hover:bg-gray-200 transition"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            >
              <FaShoppingCart className="mr-3" /> Agregar al Carrito
            </button>

            {/* Additional Product Info */}
            {product.category && (
              <div className="text-sm text-gray-500">
                Categoría: <span className="font-medium">{product.category}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer
        companyName="Mi Empresa"
        currentYear={new Date().getFullYear()}
        footerLinks={footerLinks}
      />
    </div>
  );
};

export default ProductDetails;