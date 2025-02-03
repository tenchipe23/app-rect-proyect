import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Buscar productos, marcas y más...",
  onSearch,
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      if (onSearch) {
        onSearch(searchTerm);
      } else {
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      }
    }
  };

  return (
    <div
      className={`
      relative 
      w-full 
      max-w-2xl 
      mx-auto 
      ${className}
    `}
    >
      <div
        className={`
        flex 
        items-center 
        rounded-full 
        overflow-hidden 
        transition-all 
        duration-300 
        ease-in-out
        ${
          isFocused
            ? "ring-4 ring-yellow-200 shadow-xl"
            : "shadow-md hover:shadow-lg"
        }
        bg-white
      `}
      >
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="
            flex-grow 
            px-6 
            py-4 
            text-gray-800 
            placeholder-gray-500
            focus:outline-none
            text-base
            tracking-wide
            bg-transparent
          "
        />
        <button
          onClick={handleSearch}
          className="
            bg-yellow-400 
            text-gray-800 
            px-6 
            py-4 
            hover:bg-yellow-500 
            transition-colors
            flex
            items-center
            justify-center
            group
          "
        >
          <FaSearch
            className="
            text-xl 
            group-hover:scale-110 
            transition-transform
          "
          />
        </button>
      </div>
      {searchTerm && isFocused && (
        <div
          className="
          absolute 
          top-full 
          mt-2 
          w-full 
          bg-white 
          rounded-lg 
          shadow-lg 
          z-10 
          border 
          border-gray-100
        "
        >
          {/* Optional: Add recent searches or suggestions here */}
        </div>
      )}
    </div>
  );
};
