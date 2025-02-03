import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";

// Shared Components
import { Hero } from "../../shared/components/Hero";
import { InputField } from "../../shared/components/InputField";
import { FormButton } from "../../shared/components/FormButton";
import ContactInfoCard from "../../shared/components/ContactInfoCard";
import { ModernMenu } from "../../shared/components/ModernMenu";
import Footer from "../../shared/components/Footer";

// Utilities
import { footerLinks } from "../../shared/utils/FooterLinks";

// Validation Schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Formato de correo inválido" }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Número de teléfono inválido" })
    .optional(),
  message: z
    .string()
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Datos del formulario:", data);
      reset();
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Error al enviar formulario", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ModernMenu />

      <Hero
        title="Contáctanos"
        subtitle="Estamos Aquí para Ayudarte"
        description="Si tienes alguna pregunta, sugerencia o simplemente quieres hablar con nosotros, no dudes en ponerte en contacto con nosotros."
        backgroundClass="bg-gradient-to-r from-purple-600 to-blue-500"
      />

      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <ContactInfoCard />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">
            Envíanos un Mensaje
          </h2>

          {submitSuccess && (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 text-center">
              ¡Mensaje enviado con éxito!
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputField
              name="name"
              label="Nombre Completo"
              control={control}
              placeholder="Tu Nombre"
              error={errors.name?.message}
            />

            <InputField
              name="email"
              label="Correo Electrónico"
              type="email"
              control={control}
              placeholder="tu.correo@ejemplo.com"
              error={errors.email?.message}
            />

            <InputField
              name="phone"
              label="Número de Teléfono (Opcional)"
              type="tel"
              control={control}
              placeholder="(555) 123-4567"
              error={errors.phone?.message}
            />

            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-blue-500">
                Tu Mensaje
              </label>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Cuéntanos sobre tu proyecto o consulta"
                    className={`
                      w-full 
                      px-3 
                      py-2 
                      border 
                      rounded-md 
                      h-32 
                      resize-y
                      ${errors.message ? "border-red-500" : "border-gray-300"}
                    `}
                  />
                )}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <FormButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </FormButton>
          </form>
        </motion.div>
      </div>

      {/* Sección de Mapa */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-500 text-center mb-8">
            Nuestra Ubicación
          </h2>
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.982135456!2d-73.98823!3d40.748817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjYiTiA3M8KwNTknMTcuNiJX!5e0!3m2!1sen!2sus!4v1623456789012!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Footer
        companyName="Mi Empresa"
        currentYear={new Date().getFullYear()}
        footerLinks={footerLinks}
      />
    </div>
  );
};

export default Contact;
