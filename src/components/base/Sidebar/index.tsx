import { Api } from "@/utils/api";
import { TTag } from "@/utils/api/models/tag/types";
import Link from "next/link";
import React from "react";

import ss from "./Sidebar.module.scss";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const [tags, setTags] = React.useState<TTag[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const params = {
          limit: 16,
          page: 1,
        };
        const tags = await Api().tag.getAll(params);
        console.log(tags);
        setTags(tags.items);
      } catch (err) {
        console.warn(err);
        alert("Ошибка при получении меток");
      }
    })();
  }, []);

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
            <a href="/users">
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
        <ul className={ss.tagList}>
          {tags.map((obj) => (
            <li key={obj.id} className={`hover tag ${ss.tag}`}>
              <a href={`/?tagBy=${obj.name}`}>{obj.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
