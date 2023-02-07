import { AuthInput } from "@/components";
import { AuthLayout } from "@/layouts/AuthLayout";
import { NextPage } from "next";
import Link from "next/link";

interface LoginPageProps {}

const LoginPage: NextPage<LoginPageProps> = ({}) => {
  return (
    <AuthLayout>
      <form>
        <h1 className="title">Вход</h1>
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
          Пожалуйста, заполните данные, чтобы войти в аккаунт
        </p>

        <div className="inputs">
          <AuthInput icon="email" label="Email" />
          <AuthInput icon="lock" label="Пароль" isPassword={true} />
        </div>

        <button className="btn">Вход</button>
        <div className="copy">
          Уже есть аккаунт? <Link href="/register">Зарегестрироваться</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
