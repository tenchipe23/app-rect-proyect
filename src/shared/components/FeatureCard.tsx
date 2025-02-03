import React from "react";
import {
  FaRocket,
  FaDesktop,
  FaGlobe,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

interface FeatureCardProps {
  icon?: React.ElementType;
  title?: string;
  description?: string;
  iconColor?: string;
  cardColor?: string;
  className?: string;
}

const iconMap = {
  rocket: FaRocket,
  desktop: FaDesktop,
  globe: FaGlobe,
  shield: FaShieldAlt,
  chart: FaChartLine,
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon = FaRocket,
  title = "Título de la Tarjeta",
  description = "Descripción de la tarjeta",
  iconColor = "#2575fc",
  cardColor = "white",
  className = "",
}) => {
  const IconComponent =
    typeof icon === "string"
      ? iconMap[icon as keyof typeof iconMap] || FaRocket
      : icon;

  return (
    <div
      className={`
        bg-white 
        rounded-lg 
        shadow-[0_10px_30px_rgba(0,0,0,0.1)] 
        p-10 
        text-center 
        w-[300px] 
        transition-transform 
        duration-300 
        ease-in-out 
        hover:-translate-y-2.5
        ${className}
      `}
      style={{ backgroundColor: cardColor }}
    >
      <div
        className="
          text-5xl 
          mb-5 
          flex 
          justify-center 
          items-center
        "
      >
        <IconComponent style={{ color: iconColor }} className="w-full" />
      </div>

      <h3
        className="
          mb-3.5 
          text-[#2575fc] 
          text-xl 
          font-semibold
        "
      >
        {title}
      </h3>

      <p className="text-[#666]">{description}</p>
    </div>
  );
};

export default FeatureCard;
