import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAlertStore } from "../../core/services/useAlertStore";
import { loginUser } from "../../core/services/AuthService";
import { AuthFormContainer } from "../../shared/components/AuthFormContainer";
import { InputField } from "../../shared/components/InputField";
import { FormButton } from "../../shared/components/FormButton";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { control, handleSubmit, setError } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const { show: showAlert } = useAlertStore();

  const onSubmit = async (formData: LoginFormData) => {
    try {
      const response = await loginUser(formData);

      if (response.success) {
        showAlert({
          message: response.message || "Inicio de sesión exitoso",
          type: "success",
        });
        navigate("/");
      } else {
        console.error("Login failed:", response.message);

        // More specific error handling
        if (response.message?.toLowerCase().includes("credentials")) {
          setError("password", {
            type: "manual",
            message: "Correo electrónico o contraseña incorrectos",
          });
        }

        showAlert({
          message: response.message || "Credenciales inválidas",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Unexpected login error:", error);
      showAlert({
        message: "Error en el inicio de sesión",
        type: "error",
      });
    }
  };

  return (
    <AuthFormContainer title="Iniciar Sesión" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Correo Electrónico"
        type="email"
        name="email"
        control={control}
        required
        placeholder="ejemplo@correo.com"
      />
      <InputField
        label="Contraseña"
        type="password"
        name="password"
        control={control}
        required
        placeholder="Ingresa tu contraseña"
      />
      <FormButton>Iniciar Sesión</FormButton>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </AuthFormContainer>
  );
};

export default Login;
