import React from "react";

interface AuthInputProps {
  icon: string;
  label: string;
  isPassword?: boolean;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  icon,
  label,
  isPassword,
}) => {
  const [focus, setFocus] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div
      className={`input formInput ${focus ? "focus" : ""} ${
        !focus && value ? "value" : ""
      } ${isPassword ? "password" : ""}`}
    >
      <svg width="20" height="20">
        <use xlinkHref={`../img/icons/icons.svg#${icon}`} />
      </svg>
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        type={isPassword && !showPassword ? "password" : "text"}
      />
      {focus && value && (
        <>
          <svg
            onClick={() => setValue("")}
            className="close"
            width="20"
            height="20"
          >
            <use xlinkHref="../img/icons/icons.svg#close" />
          </svg>
          {isPassword && (
            <svg
              onClick={() => setShowPassword(!showPassword)}
              className="eye"
              width="20"
              height="20"
            >
              <use
                xlinkHref={`../img/icons/icons.svg#${
                  !showPassword ? "eye" : "fire"
                }`}
              />
            </svg>
          )}
        </>
      )}
    </div>
  );
};
