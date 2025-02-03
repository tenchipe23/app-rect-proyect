import React, { useState, useEffect } from "react";
import { ModernMenu } from "../../shared/components/ModernMenu";
import Footer from "../../shared/components/Footer";
import { footerLinks } from "../../shared/utils/FooterLinks";
import {
  FaCog,
  FaUser,
  FaBell,
  FaLock,
  FaPalette,
  FaLanguage,
} from "react-icons/fa";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

interface AppSettings {
  theme: "light" | "dark";
  language: string;
  notifications: boolean;
}

const Configuration: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Usuario",
    email: "usuario@ejemplo.com",
    avatar: "/assets/default-avatar.png",
  });

  const [appSettings, setAppSettings] = useState<AppSettings>({
    theme: "light",
    language: "es",
    notifications: true,
  });

  const handleProfileUpdate = (updatedProfile: Partial<UserProfile>) => {
    setUserProfile((prevProfile) => ({ ...prevProfile, ...updatedProfile }));
  };

  const configSections = [
    {
      icon: <FaUser className="text-blue-500" />,
      title: "Perfil de Usuario",
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={userProfile.avatar}
              alt="Avatar"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">{userProfile.name}</h3>
              <p className="text-gray-500">{userProfile.email}</p>
            </div>
          </div>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Nombre"
              value={userProfile.name}
              onChange={(e) => handleProfileUpdate({ name: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={userProfile.email}
              onChange={(e) => handleProfileUpdate({ email: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      ),
    },
    {
      icon: <FaPalette className="text-purple-500" />,
      title: "Apariencia",
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span>Tema:</span>
            <select
              value={appSettings.theme}
              onChange={(e) =>
                setAppSettings((prev) => ({
                  ...prev,
                  theme: e.target.value as "light" | "dark",
                }))
              }
              className="px-3 py-2 border rounded-md"
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      icon: <FaLanguage className="text-green-500" />,
      title: "Idioma",
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span>Idioma de la aplicación:</span>
            <select
              value={appSettings.language}
              onChange={(e) =>
                setAppSettings((prev) => ({
                  ...prev,
                  language: e.target.value,
                }))
              }
              className="px-3 py-2 border rounded-md"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      icon: <FaBell className="text-yellow-500" />,
      title: "Notificaciones",
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={appSettings.notifications}
                onChange={(e) =>
                  setAppSettings((prev) => ({
                    ...prev,
                    notifications: e.target.checked,
                  }))
                }
                className="form-checkbox"
              />
              <span>Habilitar notificaciones</span>
            </label>
          </div>
        </div>
      ),
    },
    {
      icon: <FaLock className="text-red-500" />,
      title: "Seguridad",
      content: (
        <div className="space-y-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
            Cambiar Contraseña
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    console.log("App settings updated:", appSettings);
  }, [appSettings]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <ModernMenu />

      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 flex items-center">
            <FaCog className="mr-4 text-gray-600" />
            Configuración
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {configSections.map((section, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center mb-4">
                  {section.icon}
                  <h2 className="text-xl font-semibold ml-3">
                    {section.title}
                  </h2>
                </div>
                {section.content}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer
        companyName="Mi Empresa"
        currentYear={new Date().getFullYear()}
        footerLinks={footerLinks}
      />
    </div>
  );
};

export default Configuration;
