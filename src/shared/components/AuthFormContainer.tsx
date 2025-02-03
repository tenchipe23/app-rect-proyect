import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthFormContainerProps {
  title: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  children,
  onSubmit,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-6 text-center">{title}</h2>
        <form onSubmit={onSubmit}>{children}</form>
      </motion.div>
    </div>
  );
};
