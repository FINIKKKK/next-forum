import { useActions } from "@/hooks/useActions";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useSelectors } from "@/hooks/useSelectors";
import Link from "next/link";
import { setCookie } from "nookies";
import React from "react";

import ss from "./Header.module.scss";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { data: userData } = useSelectors((state) => state.user);
  const [showPopup, setShowPopup] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const { setUserData } = useActions();

  useOutsideClick(popupRef, setShowPopup);

  const onLogout = () => {
    if (window.confirm("Вы точно хотите выйти с аккаунта?")) {
      setUserData(null);
      setCookie(null, "token", "", { maxAge: 0 });
    }
  };

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
          {userData ? (
            <div ref={popupRef} className="user">
              <div className="notices">
                <svg className="icon" width="20" height="20">
                  <use xlinkHref="./img/icons/icons.svg#fire" />
                </svg>
                <span className="number">13</span>
              </div>
              <img
                onClick={() => setShowPopup(!showPopup)}
                src={
                  userData.avatar !== null
                    ? `../img/avatar.png`
                    : "../img/avatar.png"
                }
                alt="avatar"
              />
              {showPopup && (
                <div className="popup block">
                  <Link className="popup__item" href={`/profile/${1}`}>
                    Профиль
                  </Link>
                  <Link className="popup__item" href="/options">
                    Настройки
                  </Link>
                  <button className="popup__item" onClick={onLogout}>
                    Выйти
                  </button>
                </div>
              )}
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
