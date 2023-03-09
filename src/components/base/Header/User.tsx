import { useActions } from "@/hooks/useActions";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Link from "next/link";
import { setCookie } from "nookies";
import React from "react";

import ss from "./Header.module.scss";

interface UserProps {
  avatar: string;
}

export const User: React.FC<UserProps> = ({ avatar }) => {
  const [showPopup, setShowPopup] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const { setUserData } = useActions();

  useOutsideClick(popupRef, setShowPopup);

  const onLogout = () => {
    if (window.confirm("Вы точно хотите выйти с аккаунта?")) {
      setUserData(null);
      setCookie(null, "token", "", { maxAge: 0 });
    } else {
      setShowPopup(false);
    }
  };

  return (
    <div className={ss.user} ref={popupRef}>
      <img
        onClick={() => setShowPopup(!showPopup)}
        src={
          avatar !== null
            ? `http://localhost:7777/img/avatars/${avatar}`
            : "../img/avatar.png"
        }
        alt="avatar"
      />
      {showPopup && (
        <div className={`block popup ${ss.popup}`}>
          <Link className={`popup__item ${ss.popup__item}`} href={`/profile/${1}`}>
            Профиль
          </Link>
          <Link className={`popup__item ${ss.popup__item}`} href="/options">
            Настройки
          </Link>
          <button className={`popup__item ${ss.popup__item}`} onClick={onLogout}>
            Выйти
          </button>
        </div>
      )}
    </div>
  );
};
