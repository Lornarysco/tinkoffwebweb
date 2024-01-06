import React from "react";
import { InputProps } from "../../types";
import style from "./Input.module.css";

export const Input = ({
  label,
  placeholder,
  value,
  id,
  onChange,
}: InputProps) => {
  return (
    <>
      <label className={style.label}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className={style.input}
        value={value}
        id={id}
        onChange={onChange(id)}
        autoComplete="off"
      />
    </>
  );
};
