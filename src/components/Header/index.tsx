import { useSelectors } from "@/hooks/useSelectors";
import Link from "next/link";
import React from "react";

import ss from "./Header.module.scss";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { data: userData } = useSelectors((state) => state.user);
  const [showPopup, setShowPopup] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);


  const onLogout = () => {};

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
          {userData?.user?.data ? (
            <div
              ref={popupRef}
              onClick={() => setShowPopup(!showPopup)}
              className="toProfile"
            >
              <img src={userData?.user?.data.avatar !== null ? `http://localhost:7777/img/${userData?.user?.data.avatar}` : "../img/avatar.png"} alt="avatar" />
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
