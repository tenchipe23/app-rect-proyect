import React from 'react';
import { motion } from 'framer-motion';

export interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  socialLinks: { icon: React.ElementType; url: string }[];
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  image,
  socialLinks,
}) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md text-center"
    whileHover={{ scale: 1.05 }}
  >
    <img
      src={image}
      alt={name}
      className="w-40 h-40 rounded-full object-cover mx-auto mb-4 border-4 border-blue-500"
    />
    <h3 className="text-xl font-bold text-blue-600">{name}</h3>
    <p className="text-gray-700 mb-4">{role}</p>
    <div className="flex justify-center space-x-4">
      {socialLinks.map(({ icon: Icon, url }, index) => (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 text-2xl"
        >
          <Icon />
        </a>
      ))}
    </div>
  </motion.div>
);