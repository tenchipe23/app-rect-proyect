import React from "react";
import { FaTruck, FaCreditCard } from "react-icons/fa";

// Shared Components
import { Hero } from "../../shared/components/Hero";
import { SearchBar } from "../../shared/components/SearchBar";
import { ServiceHighlight } from "../../shared/components/ServiceHighlight";
import CategoryGrid from "../../shared/components/CategoryGrid";
import FeaturedProducts from "../../shared/components/FeaturedProducts";
import SpecialOffers from "../../shared/components/SpecialOffers";
import { ModernMenu } from "../../shared/components/ModernMenu";
import Footer from "../../shared/components/Footer";

// Utilities
import { footerLinks } from "../../shared/utils/FooterLinks";

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <ModernMenu />

      {/* Hero Section with Search */}
      <Hero
        title="Encuentra todo lo que necesitas"
        subtitle="Explora nuestra amplia selección de productos"
        description="Desde productos de alta calidad hasta servicios excepcionales, tu búsqueda termina aquí."
        backgroundClass="bg-gradient-to-r from-blue-600 to-indigo-700"
      >
        <SearchBar />

        <div className="flex justify-center space-x-8 mt-4">
          <ServiceHighlight 
            Icon={FaTruck} 
            text="Envío gratis" 
            className="text-white" 
          />
          <ServiceHighlight 
            Icon={FaCreditCard} 
            text="Hasta 12 cuotas" 
            className="text-white" 
          />
        </div>
      </Hero>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Product Categories */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Categorías de Productos
          </h2>
          <CategoryGrid />
        </section>

        {/* Featured Products */}
        <section>
          <FeaturedProducts 
            title="Productos Destacados"
          />
        </section>

        {/* Special Offers */}
        <section>
          <SpecialOffers 
            title="Ofertas Especiales"
          />
        </section>
      </div>

      <Footer
        companyName="Mi Empresa"
        currentYear={new Date().getFullYear()}
        footerLinks={footerLinks}
      />
    </div>
  );
};

export default Home;