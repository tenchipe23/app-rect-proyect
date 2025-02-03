import React from 'react';
import { IconType } from 'react-icons';

interface ServiceHighlightProps {
  Icon: IconType;
  text: string;
  className?: string;
}

export const ServiceHighlight: React.FC<ServiceHighlightProps> = ({ 
  Icon, 
  text, 
  className = "" 
}) => {
  return (
    <div className={`flex items-center space-x-2 text-white ${className}`}>
      <Icon className="text-2xl" />
      <span className="text-sm">{text}</span>
    </div>
  );
};