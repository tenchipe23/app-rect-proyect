import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import About from "./features/pages/About";
import Cart from "./features/pages/Card";
import Contact from "./features/pages/Contact";
import Home from "./features/pages/Home";
import ProductCatalog from "./features/pages/ProductCatalog";
import Configuration from "./features/pages/Configuration";
import Profile from "./features/pages/Profile";
import ProductDetails from "./features/pages/ProductDetails";
import Favorites from "./features/pages/Favorites";
import PrivateRoute from "./core/guards/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Definir rutas de la aplicación */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={
              <PrivateRoute>
                <Register />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <ProductCatalog />
              </PrivateRoute>
            }
          />
          <Route
            path="/configuration"
            element={
              <PrivateRoute>
                <Configuration />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          {/* Otras rutas */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
