import React from "react";
import {useController, useFormContext} from "react-hook-form";

interface AuthInputProps {
    name: string;
    icon: string;
    label: string;
    isPassword?: boolean;
}

export const AuthInput: React.FC<AuthInputProps> = ({
                                                        name,
                                                        icon,
                                                        label,
                                                        isPassword,
                                                    }) => {
    const [focus, setFocus] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const {
        register,
        formState: {errors},
    } = useFormContext();

    return (
        <>
            <div
                className={`input formInput ${focus ? "focus" : ""} ${
                    !focus && value ? "value" : ""
                } ${isPassword ? "password" : ""}`}
            >
                <svg width="20" height="20">
                    <use xlinkHref={`../img/icons/icons.svg#${icon}`}/>
                </svg>
                {/*<label>{label}</label>*/}
                <input
                    placeholder={label}
                    {...register(name)}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    // onFocus={() => setFocus(true)}
                    // onBlur={() => setFocus(false)}
                    name={name}
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
                            <use xlinkHref="../img/icons/icons.svg#close"/>
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
                                        !showPassword ? "eye" : "noeye"
                                    }`}
                                />
                            </svg>
                        )}
                    </>
                )}
            </div>
            <div className="error">{errors[name]?.message}</div>
        </>
    );
};
