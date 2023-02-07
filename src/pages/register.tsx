import { AuthInput } from "@/components";
import { AuthLayout } from "@/layouts/AuthLayout";
import { NextPage } from "next";
import Link from "next/link";

interface RegisterPageProps {}

const RegisterPage: NextPage<RegisterPageProps> = ({}) => {
  return (
    <AuthLayout>
      <form>
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

        <div className="inputs">
          <AuthInput icon="person" label="Имя" />
          <AuthInput icon="email" label="Email" />
          <AuthInput icon="lock" label="Пароль" isPassword={true} />
        </div>

        <button className="btn">Регистрaция</button>
        <div className="copy">
          Уже есть аккаунт? <Link href="/login">Войдите</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
