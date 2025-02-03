import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import About from './features/pages/About';
import Cart from './features/pages/Card';
import Contact from './features/pages/Contact';
import Home from './features/pages/Home';
import ProductCatalog from './features/pages/ProductCatalog';
import Configuration from './features/pages/Configuration';
import Profile from './features/pages/Profile';
import ProductDetails from './features/pages/ProductDetails';
import Favorites from './features/pages/Favorites';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Definir rutas de la aplicación */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          {/* Otras rutas */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;