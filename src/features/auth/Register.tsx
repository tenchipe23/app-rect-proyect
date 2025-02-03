import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAlertStore } from "../../core/services/useAlertStore";
import { AuthFormContainer } from "../../shared/components/AuthFormContainer";
import { InputField } from "../../shared/components/InputField";
import { FormButton } from "../../shared/components/FormButton";
import { registerUser } from "../../core/services/RegisterService";
import { RegisterFormData } from "../../shared/types/RegisterTypes";

/**
 * definition of the register schema with zod
 */
const registerSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "Usuario debe tener al menos 4 caracteres" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Solo letras, números y guiones bajos",
      }),
    email: z.string().email({ message: "Formato de correo inválido" }),
    password: z
      .string()
      .min(8, { message: "Contraseña debe tener al menos 8 caracteres" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Contraseña debe incluir mayúscula, minúscula, número y carácter especial",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { show: showAlert } = useAlertStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { username, email, password } = data;
      const response = await registerUser({
        username,
        email,
        password,
        confirmPassword: data.confirmPassword,
      });

      showAlert({
        message: response.message ?? "Registration completed",
        type: response.success ? "success" : "error",
      });

      if (response.success) {
        reset();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error en registro", error);
      showAlert({
        message: "Error en el registro",
        type: "error",
      });
    }
  };

  return (
    <AuthFormContainer title="Registro" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Nombre de Usuario"
        type="text"
        name="username"
        register={register("username")}
        error={errors.username?.message}
        placeholder="Ingresa tu nombre de usuario"
      />

      <InputField
        label="Correo Electrónico"
        type="email"
        name="email"
        register={register("email")}
        error={errors.email?.message}
        placeholder="Ingresa tu correo electrónico"
      />

      <div className="relative">
        <InputField
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          name="password"
          register={register("password")}
          error={errors.password?.message}
          placeholder="Ingresa tu contraseña"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-10 text-gray-500"
        >
          {showPassword ? "👁️" : "👁️‍🗨️"}
        </button>
      </div>

      <div className="relative">
        <InputField
          label="Confirmar Contraseña"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
          placeholder="Confirma tu contraseña"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-10 text-gray-500"
        >
          {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
        </button>
      </div>

      <FormButton disabled={isSubmitting}>
        {isSubmitting ? "Registrando..." : "Registrarse"}
      </FormButton>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </AuthFormContainer>
  );
};

export default Register;
