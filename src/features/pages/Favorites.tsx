import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '../../core/services/FavoritesStore';
import ProductCard from '../../shared/components/ProductCard';
import { ModernMenu } from '../../shared/components/ModernMenu';
import Footer from '../../shared/components/Footer';
import { footerLinks } from '../../shared/utils/FooterLinks';
import { FaHeart } from 'react-icons/fa';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { favorites } = useFavoritesStore();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ModernMenu />
      
      <div className="flex-grow container mx-auto px-4 py-25">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            <FaHeart className="mr-4 text-red-500" /> Mis Favoritos
          </h1>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <FaHeart className="mx-auto text-6xl text-gray-300 mb-6" />
            <p className="text-xl text-gray-600">
              Aún no tienes productos favoritos
            </p>
            <button 
              onClick={() => navigate('/products')}
              className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Explorar Productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>
        )}
      </div>

      <Footer
        companyName="Mi Empresa"
        currentYear={new Date().getFullYear()}
        footerLinks={footerLinks}
      />
    </div>
  );
};

export default Favorites;