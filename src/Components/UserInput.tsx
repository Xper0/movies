import React from "react";
import { UseFormRegisterReturn } from "react-hook-form/dist/types";

interface Input {
  // [key: string]: string;
  register?: UseFormRegisterReturn;
  // onChange: (val: any) => void;
  onChange?: () => void;
  label: string;
  placeholder: string;
  type: string;
  bg?: boolean;
  name?: string;
  value?: string;
}

const Input = ({
  label,
  placeholder,
  type,
  bg,
  register,
  name,
  value,
  onChange,
}: Input) => {
  return (
    <div className="text-sm w-full">
      <label className="text-bolder font-semibold">{label}</label>
      <input
        required
        type={type}
        name={name}
        value={value}
        {...register}
        // onChange={handleChange}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full text-sm mt-2 p-5 border border-border rounded text-white ${
          bg ? "bg-slate-900" : "bg-dry"
        }`}
      />
    </div>
  );
};

export default Input;
