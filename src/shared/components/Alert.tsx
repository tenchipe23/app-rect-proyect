import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";
import { useAlertStore } from "../../core/services/useAlertStore";

const Alert: React.FC = () => {
  const { alert, clear } = useAlertStore();

  if (!alert) return null;

  const getIconComponent = () => {
    const iconProps = {
      className: "text-5xl mb-4",
      style: { color: iconColors[alert.type || "success"] },
    };

    const iconMap = {
      success: <FaCheckCircle {...iconProps} />,
      error: <FaTimesCircle {...iconProps} />,
      warning: <FaExclamationTriangle {...iconProps} />,
      info: <FaInfoCircle {...iconProps} />,
    };

    return iconMap[alert.type || "success"];
  };

  const iconColors = {
    success: "#45b4e5",
    error: "#e74c3c",
    warning: "#f39c12",
    info: "#3498db",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex justify-center items-center">
      <div
        className={`
          bg-white rounded-lg shadow-xl p-6 max-w-md w-[90%] text-center 
          ${alert.type || "success"}
        `}
      >
        <div className="flex flex-col items-center gap-4">
          {getIconComponent()}

          <div className="text-lg mb-4">{alert.message}</div>

          {alert.showCloseButton && (
            <button
              onClick={clear}
              className="
                bg-[#45b4e5] text-white 
                px-5 py-2 rounded-md 
                hover:bg-[#3a9bca] 
                transition-colors duration-300
              "
            >
              Aceptar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
