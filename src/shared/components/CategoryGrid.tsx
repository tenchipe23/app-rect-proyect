import React from "react";
import { useNavigate } from "react-router-dom";

export interface Category {
  name: string;
  image: string;
}

const DEFAULT_CATEGORIES: Category[] = [
  { name: "Electronics", image: "/assets/categories/electronics.jpg" },
  { name: "Fashion", image: "/assets/categories/fashion.jpg" },
  { name: "Home", image: "/assets/categories/home.jpg" },
  { name: "Sports", image: "/assets/categories/sports.jpg" },
  { name: "Technology", image: "/assets/categories/tech.jpg" },
  { name: "Beauty", image: "/assets/categories/beauty.jpg" },
];

interface CategoryGridProps {
  categories?: Category[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories = DEFAULT_CATEGORIES,
}) => {
  const navigate = useNavigate();

  const onCategoryClick = (category: Category): void => {
    console.log(`Clicked category: ${category.name}`);
    navigate(`/category/${category.name.toLowerCase()}`);
  };

  return (
    <div className="flex justify-center gap-[30px] flex-wrap p-10 bg-white">
      {categories.map((category, index) => (
        <div
          key={index}
          className="
            text-center w-[120px] cursor-pointer 
            transition-transform duration-300 ease-in-out 
            hover:scale-110 group
          "
          onClick={() => onCategoryClick(category)}
        >
          <div className="mb-2.5 overflow-hidden rounded-[10px] shadow-md">
            <img
              src={category.image}
              alt={category.name}
              className="
                w-full h-[100px] object-cover 
                group-hover:scale-110 transition-transform duration-300
              "
            />
          </div>
          <span
            className="
            block text-[0.9rem] text-[#2c3e50] 
            font-medium group-hover:text-blue-500
          "
          >
            {category.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
