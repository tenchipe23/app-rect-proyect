import React from "react";
import { IconType } from "react-icons";

interface FormButtonProps {
  type?: "button" | "submit";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  icon?: IconType;
}

export const FormButton: React.FC<FormButtonProps> = ({
  type = "submit",
  children,
  className = "",
  disabled = false,
  icon: Icon,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        w-full 
        bg-blue-500 
        text-white 
        py-2 
        rounded 
        hover:bg-blue-600 
        transition-colors 
        duration-300
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
        flex items-center justify-center gap-2
      `}
    >
      {Icon && <Icon className="mr-2" />}
      {children}
    </button>
  );
};
