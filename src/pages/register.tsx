import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie } from "nookies";
import { useRouter } from "next/router";

import { AuthInput } from "@/components";
import { AuthLayout } from "@/layouts/AuthLayout";
import { RegisterScheme } from "@/utils/validation";
import { Api } from "@/utils/api";
import { useActions } from "@/hooks/useActions";
import { RegisterUserDto } from "@/utils/api/models/auth/types";

interface RegisterPageProps {}

const RegisterPage: NextPage<RegisterPageProps> = ({}) => {
  const form = useForm({
    resolver: yupResolver(RegisterScheme),
  });
  const [error, setError] = React.useState("");
  const router = useRouter();
  const { setUserData } = useActions();

  const onSubmit = async (dto: RegisterUserDto) => {
    try {
      const user = await Api().auth.register(dto);
      setCookie(null, "token", user.token, {
        maxAge: 30 * 60 * 24 * 60,
        path: "/",
      });
      setUserData(user.token);
      setError("");
      router.push("/");
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  return (
    <AuthLayout>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="title">Регистрация</h1>
          <ul className="socNav">
            <li className="item">
              <a href="#">
                <svg width="20" height="20">
                  <use xlinkHref="../img/icons/icons.svg#github" />
                </svg>
              </a>
            </li>
            <li className="item">
              <a href="#">
                <svg width="20" height="20">
                  <use xlinkHref="../img/icons/icons.svg#google" />
                </svg>
              </a>
            </li>
          </ul>
          <p className="text">
            Пожалуйста, заполните данные, чтобы создать аккаунт
          </p>
          <div className="errorMessage">{error}</div>

          <div className="inputs">
            <AuthInput name="login" icon="person" label="Имя" />
            <AuthInput name="email" icon="email" label="Email" />
            <AuthInput
              name="password"
              icon="lock"
              label="Пароль"
              isPassword={true}
            />
          </div>

          <button className="btn">Регистрaция</button>
          <div className="copy">
            Уже есть аккаунт? <Link href="/login">Войдите</Link>
          </div>
        </form>
      </FormProvider>
    </AuthLayout>
  );
};

export default RegisterPage;
