import React, { useState } from 'react';
import { ModernMenu } from '../../shared/components/ModernMenu';
import Footer from '../../shared/components/Footer';
import { footerLinks } from '../../shared/utils/FooterLinks';
import { 
  FaUser, 
  FaEnvelope,  
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaEdit, 
  FaSave 
} from 'react-icons/fa';

interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  avatar: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfileData>({
    firstName: 'José',
    lastName: 'Manuel',
    email: 'jose.manuel@ejemplo.com',
    phone: '+52 55 1234 5678',
    address: 'Av. Tecnológico 123, Ciudad de México, CDMX',
    birthDate: '1990-05-15',
    avatar: '/assets/default-avatar.png'
  });

  const [isEditing, setIsEditing] = useState(false);

  const [editProfile, setEditProfile] = useState<UserProfileData>({...profile});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const saveProfile = () => {
    setProfile({...editProfile});
    setIsEditing(false);
  };

  const profileSections = [
    {
      icon: <FaUser className="text-blue-500" />,
      title: 'Información Personal',
      fields: [
        { 
          label: 'Nombre', 
          value: `${profile.firstName} ${profile.lastName}`,
          editComponent: (
            <div className="flex space-x-2">
              <input 
                type="text" 
                name="firstName"
                value={editProfile.firstName}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-1/2"
                placeholder="Nombre"
              />
              <input 
                type="text" 
                name="lastName"
                value={editProfile.lastName}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-1/2"
                placeholder="Apellido"
              />
            </div>
          )
        }
      ]
    },
    {
      icon: <FaEnvelope className="text-green-500" />,
      title: 'Contacto',
      fields: [
        { 
          label: 'Correo Electrónico', 
          value: profile.email,
          editComponent: (
            <input 
              type="email" 
              name="email"
              value={editProfile.email}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              placeholder="Correo Electrónico"
            />
          )
        },
        { 
          label: 'Teléfono', 
          value: profile.phone,
          editComponent: (
            <input 
              type="tel" 
              name="phone"
              value={editProfile.phone}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              placeholder="Número de Teléfono"
            />
          )
        }
      ]
    },
    {
      icon: <FaMapMarkerAlt className="text-red-500" />,
      title: 'Dirección',
      fields: [
        { 
          label: 'Dirección Completa', 
          value: profile.address,
          editComponent: (
            <input 
              type="text" 
              name="address"
              value={editProfile.address}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              placeholder="Dirección Completa"
            />
          )
        }
      ]
    },
    {
      icon: <FaCalendarAlt className="text-purple-500" />,
      title: 'Información Adicional',
      fields: [
        { 
          label: 'Fecha de Nacimiento', 
          value: new Date(profile.birthDate).toLocaleDateString(),
          editComponent: (
            <input 
              type="date" 
              name="birthDate"
              value={editProfile.birthDate}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            />
          )
        }
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <ModernMenu />

      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex items-center mb-8 space-x-6">
            <div className="relative">
              <img 
                src={profile.avatar} 
                alt="Perfil" 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer">
                  <FaEdit />
                  <input 
                    type="file" 
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-gray-600">Usuario Registrado</p>
            </div>
            <div className="ml-auto">
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center"
                >
                  <FaEdit className="mr-2" /> Editar Perfil
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button 
                    onClick={saveProfile}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition flex items-center"
                  >
                    <FaSave className="mr-2" /> Guardar
                  </button>
                  <button 
                    onClick={() => {
                      setEditProfile({...profile});
                      setIsEditing(false);
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Sections */}
          <div className="grid md:grid-cols-2 gap-8">
            {profileSections.map((section, index) => (
              <div 
                key={index} 
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center mb-4">
                  {section.icon}
                  <h2 className="text-xl font-semibold ml-3">{section.title}</h2>
                </div>
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      {field.label}
                    </label>
                    {!isEditing ? (
                      <p className="text-gray-600">{field.value}</p>
                    ) : (
                      field.editComponent
                    )}
                  </div>
                ))}
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

export default Profile;