import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface HeroProps {
  title: string;
  description: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundClass?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  overlayOpacity?: number;
  children?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  description,
  subtitle,
  backgroundImage,
  backgroundClass,
  primaryButtonText = "Shop Now",
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  overlayOpacity = 0.5,
  children,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div
      className={`relative w-full min-h-[600px] flex items-center justify-center bg-cover bg-center ${
        backgroundClass || "bg-gradient-to-r from-blue-500 to-purple-600"
      }`}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
      }}
    >
      {/* Background Overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content Container */}
      <motion.div
        className="container mx-auto px-4 z-10 text-center relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg"
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.h2
            className="text-2xl md:text-4xl mb-8 text-gray-200 font-medium"
            variants={itemVariants}
          >
            {subtitle}
          </motion.h2>
        )}

        <motion.p
          className="text-lg md:text-xl mb-10 text-gray-100 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          {description}
        </motion.p>

        {children && (
          <motion.div variants={itemVariants}>
            {children}
          </motion.div>
        )}

        <motion.div
          className="flex justify-center space-x-4"
          variants={itemVariants}
        >
          {primaryButtonLink && (
            <Link
              to={primaryButtonLink}
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-300 transform hover:scale-105 inline-block shadow-lg"
            >
              {primaryButtonText}
            </Link>
          )}

          {secondaryButtonLink && (
            <Link
              to={secondaryButtonLink}
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 transform hover:scale-105 inline-block"
            >
              {secondaryButtonText}
            </Link>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
