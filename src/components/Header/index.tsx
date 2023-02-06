import Link from "next/link";
import React from "react";

import ss from "./Header.module.scss";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header className="header">
      <div className="container">
        <nav className="menu">
          <div className="box">
            <Link href="/" className="logo">
              <img src="../img/logo.svg" alt="logo" />
            </Link>
            <ul className="list">
              <li className="item active">
                <a href="#">Форум</a>
              </li>
              <li className="item">
                <a href="#">Лента</a>
              </li>
              <li className="item">
                <a href="#">Вакансии</a>
              </li>
              <li className="item">
                <a href="#"></a>
              </li>
            </ul>
          </div>
          <Link href="/register" className="btn">
            Войти
          </Link>
        </nav>
      </div>
    </header>
  );
};
