import React, { useState, useMemo } from "react";
import { Hero } from "../../shared/components/Hero";
import { SearchBar } from "../../shared/components/SearchBar";
import { ModernMenu } from "../../shared/components/ModernMenu";
import Footer from "../../shared/components/Footer";
import ProductCard from "../../shared/components/ProductCard";
import { CallToAction } from "../../shared/components/CallToAction";
import { footerLinks } from "../../shared/utils/FooterLinks";
import { Product } from "../../shared/types/ProductTypes";
import ProductFilter from "../../shared/components/ProductFilter";
import ProductPagination from "../../shared/components/ProductPagination";
import { DEFAULT_PRODUCTS } from "../../shared/data/ProductData";
const PRODUCTS_PER_PAGE = 8;

const ProductCatalog: React.FC = () => {
  const [products] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  type SortOption = "name" | "price-asc" | "price-desc";
  const [sortBy, setSortBy] = useState<SortOption>("name");

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);
  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter(
        (product) =>
          !filterCategory ||
          product.name.toLowerCase().includes(filterCategory.toLowerCase()) ||
          product.category === filterCategory
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [products, sortBy, filterCategory]);

  /**
   * Pagination logic
   */
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / PRODUCTS_PER_PAGE
  );
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );
  }, [filteredAndSortedProducts, currentPage]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <ModernMenu />

      <Hero
        title="Catálogo de Productos"
        subtitle="Los mejores productos al alcance de un click"
        description="Explora nuestra selección de productos de alta tecnología"
        backgroundClass="bg-gradient-to-r from-blue-500 to-blue-600"
      >
        <SearchBar />
      </Hero>

      <div className="container mx-auto px-4 py-16 flex-grow">
        <ProductFilter
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
        />

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Products Message */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center text-gray-500 py-16">
            No se encontraron productos
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <CallToAction
        variant="minimal"
        title="¿No encuentras lo que buscas?"
        description="Contáctanos y te ayudaremos a encontrar el producto perfecto"
        buttonText="Contactar Soporte"
        buttonLink="/contact"
      />

      <Footer
        companyName="Mi Empresa"
        currentYear={new Date().getFullYear()}
        footerLinks={footerLinks}
      />
    </div>
  );
};

export default ProductCatalog;
