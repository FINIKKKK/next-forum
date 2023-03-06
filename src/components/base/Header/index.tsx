import ss from "./Header.module.scss";
import { Notices } from "./Notices";
import { User } from "./User";
import { useActions } from "@/hooks/useActions";
import { useSelectors } from "@/hooks/useSelectors";
import { Theme } from "@/redux/user/types";
import Link from "next/link";
import React from "react";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { data: userData, theme } = useSelectors((state) => state.user);
  const { setTheme } = useActions();


  const onChangeTheme = () => {
    const newTheme = theme === Theme.dark ? Theme.light : Theme.dark;
    setTheme(newTheme);
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

          {userData ? (
            <div className={ss.options}>
              <button onClick={onChangeTheme} className="btn__theme">
                <span className={`shape ${theme === Theme.dark ? "sun" : "moon"}`}></span>
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
