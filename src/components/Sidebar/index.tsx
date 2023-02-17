import Link from "next/link";
import React from "react";

import ss from "./Sidebar.module.scss";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <aside className={`sidebar ${ss.sidebar}`}>
      <Link href="/create" className={`btn ${ss.btn}`}>
        Задать вопрос
      </Link>
      <div className={ss.block}>
        <h5>Меню</h5>
        <ul className={ss.nav}>
          <li className={`hover ${ss.item} ${ss.active}`}>
            <a href="#">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#questions2" />
              </svg>
              <p>Все вопросы</p>
            </a>
          </li>
          <li className={`hover ${ss.item}`}>
            <a href="#">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#fire" />
              </svg>
              <p>Мои предпочтения</p>
            </a>
          </li>
          <li className={`hover ${ss.item}`}>
            <a href="#">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#questions" />
              </svg>
              <p>Мои вопросы</p>
            </a>
          </li>
          <li className={`hover ${ss.item}`}>
            <a href="#">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#favorite" />
              </svg>
              <p>Мое избранное</p>
            </a>
          </li>
          <li className={`hover ${ss.item}`}>
            <a href="#">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#subcribe" />
              </svg>
              <p>Отслеживаемое</p>
            </a>
          </li>
          <li className={`hover ${ss.item}`}>
            <Link href="/tags">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#tags" />
              </svg>
              <p>Все метки</p>
            </Link>
          </li>
          <li className={`hover ${ss.item}`}>
            <a href="#">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#users" />
              </svg>
              <p>Все пользователи</p>
            </a>
          </li>
        </ul>
      </div>

      <div className={ss.block}>
        <h5>Топ меток</h5>
        <ul className={`tagList ${ss.tagList}`}>
          <li className={`hover ${ss.tag}`}>
            <a href="#">POSTGRES</a>
          </li>
          <li className={`hover ${ss.tag}`}>
            <a href="#">PYthon</a>
          </li>
          <li className={`hover ${ss.tag}`}>
            <a href="#">C++</a>
          </li>
          <li className={`hover ${ss.tag}`}>
            <a href="#">Figma</a>
          </li>
          <li className={`hover ${ss.tag}`}>
            <a href="#">NExtJS</a>
          </li>
          <li className={`hover ${ss.tag}`}>
            <a href="#">NEstJS</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};
