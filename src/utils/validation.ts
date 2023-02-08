import * as yup from "yup";

export const RegisterScheme = yup.object().shape({
  login: yup
    .string()
    .min(3, "Логин должен состоять минимум из 3 символов")
    .required("Поле является обязательным"),
  email: yup
    .string()
    .email("Некорректный email")
    .required("Поле является обязательным"),
  password: yup
    .string()
    .min(9, "Пароль должен состоять минимум из 9 символов")
    .required("Поле является обязательным"),
});

export const LoginScheme = yup.object().shape({
  email: yup
    .string()
    .email("Некорректный email")
    .required("Поле является обязательным"),
  password: yup
    .string()
    .min(9, "Пароль должен состоять минимум из 9 символов")
    .required("Поле является обязательным"),
});
