import { useState } from "react";
import "./formLogin.css"

const FormLogin = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formLogin">
      <label>{label}</label>
      <input
        className="inputLogin"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className="errorMessage">{errorMessage}</span>
    </div>
  );
};

export default FormLogin;