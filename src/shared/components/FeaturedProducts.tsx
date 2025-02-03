import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types/ProductTypes";
import { DEFAULT_PRODUCTS } from "../data/ProductData";

interface FeaturedProductsProps {
  title?: string;
  products?: Product[];
  className?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title = "Featured Products",
  products = DEFAULT_PRODUCTS,
  className,
}) => {
  return (
    <section
      className={`
        ${className} 
        py-12 px-5 
        bg-[#f5f5f5]
      `}
    >
      <h2
        className="
          text-center 
          mb-7.5 
          text-[#2c3e50] 
          font-medium 
          text-2xl
        "
      >
        {title}
      </h2>

      <div
        className="
          grid 
          grid-cols-[repeat(auto-fill,minmax(250px,1fr))] 
          gap-7.5 
          justify-center
          max-md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]
          max-md:gap-5
        "
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
