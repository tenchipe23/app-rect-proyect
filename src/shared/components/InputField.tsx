import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseFormRegisterReturn,
} from "react-hook-form";

interface InputFieldProps<TFieldValues extends FieldValues> {
  label: string;
  type?: string;
  name: Path<TFieldValues>;
  control?: Control<TFieldValues>;
  required?: boolean;
  error?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  register?: UseFormRegisterReturn;
}

export const InputField = React.forwardRef<
  HTMLInputElement,
  InputFieldProps<FieldValues>
>(
  (
    {
      label,
      type = "text",
      name,
      control,
      required = false,
      error,
      placeholder,
      onChange,
      value,
      register,
    },
    ref
  ) => {
    if (control) {
      return (
        <div className="mb-4">
          <label
            htmlFor={name}
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                ref={ref}
                type={type}
                id={name}
                className={`
                w-full 
                px-3 
                py-2 
                border 
                rounded 
                ${error ? "border-red-500" : "border-gray-300"}
              `}
                required={required}
                placeholder={placeholder}
              />
            )}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      );
    }
    if (register) {
      return (
        <div className="mb-4">
          <label
            htmlFor={name}
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          <input
            {...register}
            ref={ref}
            type={type}
            id={name}
            className={`
            w-full 
            px-3 
            py-2 
            border 
            rounded 
            ${error ? "border-red-500" : "border-gray-300"}
          `}
            required={required}
            placeholder={placeholder}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      );
    }

    // Fallback for uncontrolled inputs
    return (
      <div className="mb-4">
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          ref={ref}
          value={value}
          onChange={onChange}
          className={`
          w-full 
          px-3 
          py-2 
          border 
          rounded 
          ${error ? "border-red-500" : "border-gray-300"}
        `}
          required={required}
          placeholder={placeholder}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);
