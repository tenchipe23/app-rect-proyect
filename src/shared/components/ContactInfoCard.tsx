import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export interface ContactInfoItem {
  icon: React.ElementType;
  title: string;
  details: string;
}

const DEFAULT_CONTACT_INFO: ContactInfoItem[] = [
  {
    icon: FaMapMarkerAlt,
    title: "Dirección",
    details: "Av. Tecnológico 123, Dos Caminos, Cuitlahuac 94910",
  },
  {
    icon: FaPhone,
    title: "Teléfono",
    details: "+52 (55) 1234-5678",
  },
  {
    icon: FaEnvelope,
    title: "Correo Electrónico",
    details: "contacto@empresa.com",
  },
];

interface ContactInfoCardProps {
  contactInfo?: ContactInfoItem[];
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  contactInfo = DEFAULT_CONTACT_INFO,
}) => {
  return (
    <div
      className="
      bg-white 
      p-10 
      m-5 
      rounded-lg 
      shadow-[0_10px_30px_rgba(0,0,0,0.1)]
    "
    >
      <h2
        className="
        text-[#2575fc] 
        mb-7.5 
        text-center 
        text-2xl 
        font-bold
      "
      >
        Ponte en Contacto
      </h2>

      <div className="flex flex-col">
        {contactInfo.map((info, index) => (
          <div
            key={index}
            className="
              flex 
              items-center 
              mb-7.5 
              max-md:flex-col 
              max-md:text-center
            "
          >
            <div
              className="
              text-4xl 
              text-[#2575fc] 
              mr-5 
              w-[60px] 
              text-center 
              max-md:mr-0 
              max-md:mb-3.5
            "
            >
              <info.icon />
            </div>

            <div>
              <h3
                className="
                mb-2.5 
                text-[#2575fc] 
                font-semibold 
                text-lg
              "
              >
                {info.title}
              </h3>
              <p className="text-gray-700">{info.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfoCard;
