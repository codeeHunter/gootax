import React from "react";
import Styles from "./Input.module.scss";

export const Input = ({
  label,
  type = "text",
  setState,
  state,
  error = false,
}) => {
  return (
    <div className={Styles.form}>
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        type={type}
        id="email"
        className={
          error
            ? [Styles.form__input, Styles.form__error].join(" ")
            : Styles.form__input
        }
        autoComplete="off"
        placeholder=" "
      />
      <label htmlFor="email" className={Styles.form__label}>
        {label}
      </label>
    </div>
  );
};
