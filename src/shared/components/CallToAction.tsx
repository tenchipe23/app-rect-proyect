import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type CallToActionVariant = "default" | "outlined" | "split" | "minimal";

interface CallToActionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  variant?: CallToActionVariant;
  backgroundClass?: string;
  icon?: React.ReactNode;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  title = "Ready to Explore Our World?",
  description = "Start your shopping journey with us and experience the difference",
  buttonText = "Shop Now",
  buttonLink = "/products",
  variant = "default",
  backgroundClass,
  icon,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "outlined":
        return {
          container: `border-4 border-white bg-transparent ${
            backgroundClass || "bg-blue-500"
          }`,
          title: "text-white",
          description: "text-gray-200",
          button: "bg-white text-blue-600 hover:bg-blue-50",
        };
      case "split":
        return {
          container: `grid md:grid-cols-2 gap-8 items-center ${
            backgroundClass || "bg-gradient-to-r from-blue-600 to-purple-600"
          }`,
          title: "text-white text-left",
          description: "text-gray-200 text-left",
          button: "bg-white text-blue-600 justify-self-start hover:bg-blue-50",
        };
      case "minimal":
        return {
          container: `bg-gray-100 ${backgroundClass}`,
          title: "text-gray-800",
          description: "text-gray-600",
          button: "bg-blue-500 text-white hover:bg-blue-600",
        };
      default:
        return {
          container: `${
            backgroundClass || "bg-gradient-to-r from-blue-600 to-purple-600"
          }`,
          title: "text-white",
          description: "text-gray-200",
          button: "bg-white text-blue-600 hover:bg-blue-50",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <section className={`py-20 text-center ${styles.container}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`container mx-auto px-4 ${
          variant === "split" ? "grid md:grid-cols-2 gap-8 items-center" : ""
        }`}
      >
        <div className={variant === "split" ? "order-2" : ""}>
          {icon && <div className="mb-6 flex justify-center">{icon}</div>}
          <h2 className={`text-4xl font-bold mb-6 ${styles.title}`}>{title}</h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${styles.description}`}>
            {description}
          </p>
          <Link
            to={buttonLink}
            className={`inline-block px-8 py-3 rounded-full font-bold transition ${styles.button}`}
          >
            {buttonText}
          </Link>
        </div>
        {variant === "split" && (
          <div className="order-1 hidden md:block">
            {/* Optional image or illustration placeholder */}
            <div className="bg-white/20 h-96 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl">Illustration</span>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};
