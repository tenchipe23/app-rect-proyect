import React from 'react';
import { motion } from 'framer-motion';

export interface ValueCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  iconColor?: string;
  titleColor?: string;
}

export const ValueCard: React.FC<ValueCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  iconColor = 'text-blue-600',
  titleColor = 'text-blue-600'
}) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md text-center transition-all hover:shadow-xl"
    whileHover={{ scale: 1.05 }}
  >
    <Icon className={`text-5xl ${iconColor} mx-auto mb-4`} />
    <h3 className={`text-xl font-bold ${titleColor} mb-3`}>{title}</h3>
    <p className="text-gray-700">{description}</p>
  </motion.div>
);