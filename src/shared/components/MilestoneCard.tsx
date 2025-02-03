import React from 'react';
import { motion } from 'framer-motion';

export interface MilestoneCardProps {
  year: number;
  title: string;
  description: string;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  year,
  title,
  description,
}) => (
  <motion.div
    className="bg-gray-100 p-6 rounded-lg relative overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <span className="absolute top-2 right-4 text-6xl font-bold text-blue-200 opacity-50">
      {year}
    </span>
    <h3 className="text-xl font-bold text-blue-600 mb-3">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </motion.div>
);