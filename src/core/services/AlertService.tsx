import React from "react";
import { useAlertStore } from "./useAlertStore";

/**
 * Componente de Alerta Global
 * @returns {JSX.Element}
 */
export const GlobalAlert: React.FC = () => {
  const { alert, clear } = useAlertStore();

  if (!alert) return null;

  const alertStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded shadow-lg z-50 ${
        alertStyles[alert.type || "info"]
      }`}
    >
      {alert.message}
      {alert.showCloseButton && (
        <button onClick={clear} className="ml-4 text-white hover:opacity-75">
          Cerrar
        </button>
      )}
    </div>
  );
};
