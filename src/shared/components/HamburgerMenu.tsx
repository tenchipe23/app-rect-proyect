import React, { useState } from 'react';
import { 
  FaHome, 
  FaInfoCircle, 
  FaCogs, 
  FaEnvelope, 
  FaSignInAlt, 
  FaShoppingCart, 
  FaBox 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  label: string;
  route: string;
  icon: React.ElementType;
}

const MENU_ITEMS: MenuItem[] = [
  { label: 'Inicio', route: '/', icon: FaHome },
  { label: 'Nosotros', route: '/about', icon: FaInfoCircle },
  { label: 'Servicios', route: '/services', icon: FaCogs },
  { label: 'Contacto', route: '/contact', icon: FaEnvelope },
  { label: 'Iniciar Sesión', route: '/login', icon: FaSignInAlt },
  { label: 'Catálogo de Productos', route: '/products', icon: FaBox },
  { label: 'Carrito de Compras', route: '/cart', icon: FaShoppingCart }
];

const HamburgerMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigateTo = (route: string) => {
    navigate(route);
    closeMenu();
  };

  return (
    <>
      {/* Hamburguesa */}
      <div 
        className={`
          fixed 
          top-5 
          left-5 
          z-[1100] 
          cursor-pointer 
          transition-transform 
          duration-300 
          ease-in-out 
          ${isMenuOpen ? 'transform rotate-90' : ''}
        `}
        onClick={toggleMenu}
      >
        <div className="w-10 h-[30px] flex flex-col justify-between">
          <motion.span 
            className="w-full h-1 bg-[#2575fc] origin-left"
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              translateY: isMenuOpen ? 5 : 0,
              translateX: isMenuOpen ? 5 : 0
            }}
          />
          <motion.span 
            className="w-full h-1 bg-[#2575fc]"
            animate={{
              opacity: isMenuOpen ? 0 : 1
            }}
          />
          <motion.span 
            className="w-full h-1 bg-[#2575fc] origin-left"
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              translateY: isMenuOpen ? -5 : 0,
              translateX: isMenuOpen ? 5 : 0
            }}
          />
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div 
              className="
                fixed 
                inset-0 
                bg-black/50 
                z-[1000]
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />

            {/* Menú */}
            <motion.nav 
              className="
                fixed 
                top-0 
                left-0 
                w-[300px] 
                h-full 
                bg-[#2575fc] 
                z-[1050] 
                pt-[100px] 
                shadow-2xl
              "
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
            >
              <ul className="list-none p-0 m-0">
                {MENU_ITEMS.map((item, index) => (
                  <motion.li 
                    key={item.route}
                    className="
                      px-5 
                      py-5 
                      text-white 
                      cursor-pointer 
                      flex 
                      items-center 
                      text-[1.1rem] 
                      hover:bg-white/20 
                      transition-colors 
                      duration-300
                    "
                    onClick={() => navigateTo(item.route)}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: index * 0.1 } 
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <item.icon className="mr-4 text-2xl" />
                    {item.label}
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;