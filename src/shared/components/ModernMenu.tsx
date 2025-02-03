import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaInfoCircle,
  FaBox,
  FaEnvelope,
  FaCog,
  FaUserCircle,
  FaShoppingCart,
  FaSearch,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";
import { authService } from "../../core/services/AuthService";

interface MenuLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const MENU_LINKS: MenuLink[] = [
  { label: "Inicio", href: "/", icon: <FaHome /> },
  { label: "Acerca de", href: "/about", icon: <FaInfoCircle /> },
  { label: "Productos", href: "/products", icon: <FaBox /> },
  { label: "Favoritos", href: "/favorites", icon: <FaHeart /> },
  { label: "Contacto", href: "/contact", icon: <FaEnvelope /> },
  { label: "Perfil", href: "/profile", icon: <FaUserCircle /> },
];

export const ModernMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login", { replace: true });
  };

  const MENU_LINKS_WITH_LOGOUT: MenuLink[] = [
    ...MENU_LINKS,
    {
      label: "Cerrar Sesión",
      href: "/login",
      icon: <FaSignOutAlt />,
      onClick: handleLogout,
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" },
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Mi compañia
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {MENU_LINKS_WITH_LOGOUT.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-lg transition duration-300 ease-in-out
                ${
                  location.pathname === link.href
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                }
              `}
              onClick={link.onClick}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}

          {/* Additional Icons */}
          <div className="flex space-x-4">
            <Link
              to="/cart"
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              <FaShoppingCart size={20} />
            </Link>
            <Link
              to="/configuration"
              className="text-gray-600 hover:text-blue-600 transition duration-300 "
            >
              <FaCog size={20} />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            className="focus:outline-none transform transition hover:scale-110"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
              onClick={toggleMenu}
            >
              <motion.div
                initial={menuVariants.initial}
                animate={menuVariants.animate}
                exit={menuVariants.exit}
                transition={{ type: "tween", duration: 0.3 }}
                className="absolute right-0 top-0 w-72 h-full bg-white shadow-2xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col space-y-4">
                  {MENU_LINKS_WITH_LOGOUT.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`
                        flex items-center space-x-4 p-3 rounded-lg transition duration-300
                        ${
                          location.pathname === link.href
                            ? "bg-blue-500 text-white"
                            : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                        }
                      `}
                      onClick={() => {
                        link.onClick?.();
                        toggleMenu();
                      }}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}

                  {/* Additional Mobile Menu Icons */}
                  <div className="border-t pt-4 mt-4 flex justify-between">
                    <Link
                      to="/cart"
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                      onClick={toggleMenu}
                    >
                      <FaShoppingCart />
                      <span>Cart</span>
                    </Link>
                    <Link
                      to="/configuration"
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                      onClick={toggleMenu}
                    >
                      <FaCog />
                      <span>Settings</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Overlay (Mobile and Desktop) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center"
              onClick={() => setIsSearchOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg p-6 w-11/12 max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center border rounded-full px-4 py-2">
                  <FaSearch className="text-gray-500 mr-3" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full focus:outline-none"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
