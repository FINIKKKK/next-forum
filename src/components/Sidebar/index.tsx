import React from "react";

import ss from "./Sidebar.module.scss";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <aside className="sidebar">
      <a href="#" className="btn">
        Задать вопрос
      </a>
      <div className="box">
        <h5>Меню</h5>
        <ul className="nav">
          <li className="item hover active">
            <a href="#">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#fire" />
              </svg>
              <p>Мои предпочтения</p>
            </a>
          </li>
          <li className="item hover">
            <a href="#">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#favorite" />
              </svg>
              <p>Мое избранное</p>
            </a>
          </li>
          <li className="item hover">
            <a href="#">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#questions" />
              </svg>
              <p>Мои вопросы</p>
            </a>
          </li>
          <li className="item hover">
            <a href="#">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#tags" />
              </svg>
              <p>Все метки</p>
            </a>
          </li>
          <li className="item hover">
            <a href="#">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#users" />
              </svg>
              <p>Все пользователи</p>
            </a>
          </li>
        </ul>
      </div>

      <div className="box">
        <h5>Топ меток</h5>
        <ul className="tagList">
          <li className="tag hover">
            <a href="#">POSTGRES</a>
          </li>
          <li className="tag hover">
            <a href="#">PYthon</a>
          </li>
          <li className="tag hover">
            <a href="#">C++</a>
          </li>
          <li className="tag hover">
            <a href="#">Figma</a>
          </li>
          <li className="tag hover">
            <a href="#">NExtJS</a>
          </li>
          <li className="tag hover">
            <a href="#">NEstJS</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};
