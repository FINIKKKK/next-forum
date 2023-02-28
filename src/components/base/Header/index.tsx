import React from "react";
import Link from "next/link";

import { Notices } from "./Notices";
import { User } from "./User";
import { useSelectors } from "@/hooks/useSelectors";

import ss from "./Header.module.scss";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { data: userData } = useSelectors((state) => state.user);
  const [lightTheme, setLightTheme] = React.useState(false);

  const onChangeTheme = () => {
    setLightTheme(!lightTheme);
  };

  return (
    <header className={ss.header}>
      <div className="container">
        <nav className={ss.nav}>
          <div className={ss.box}>
            <Link href="/" className={ss.logo}>
              <img src="../img/logo.svg" alt="logo" />
            </Link>
            <ul className={ss.menu}>
              <li className={`${ss.item} ${ss.active}`}>
                <a href="#">Форум</a>
              </li>
              <li className={ss.item}>
                <a href="#">Лента</a>
              </li>
              <li className={ss.item}>
                <a href="#">Вакансии</a>
              </li>
            </ul>
          </div>

          <div className={ss.theme}></div>

          {userData ? (
            <div className={ss.options}>
              <button onClick={onChangeTheme} className="btn__theme">
                <span className={`shape ${lightTheme ? "sun" : "moon"}`}></span>
                <span className="rays--container">
                  <span className="ray"></span>
                  <span className="ray"></span>
                  <span className="ray"></span>
                  <span className="ray"></span>
                </span>
              </button>
              <Notices />
              <User avatar={userData.avatar} />
            </div>
          ) : (
            <Link href="/login" className="btn">
              Войти
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
