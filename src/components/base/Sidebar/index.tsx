import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Sticky from 'react-stickynode';

import { useSelectors } from '@/hooks/useSelectors';
import { Api } from '@/utils/api';
import { TTag } from '@/utils/api/models/tag/types';

import ss from './Sidebar.module.scss';

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const [tags, setTags] = React.useState<TTag[]>([]);
  const [bottomBoundary, setBottomBoundary] = React.useState<number | null>(
    null,
  );
  const router = useRouter();
  const { data: userData } = useSelectors((state) => state.user);

  React.useEffect(() => {
    const handleResize = () => {
      const boundary = document.documentElement.scrollHeight - 200;
      setBottomBoundary(boundary);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const params = {
          limit: 16,
          page: 1,
        };
        const tags = await Api().tag.getAll(params);
        setTags(tags.items);
      } catch (err) {
        console.warn(err);
        alert('Ошибка при получении меток');
      }
    })();
  }, []);

  return (
    <Sticky
      top={25}
      bottomBoundary={bottomBoundary ? bottomBoundary : 'window'}
      className={`sidebar ${ss.sidebar}`}
    >
      {userData && (
        <Link href="/create" className={`btn ${ss.btn}`}>
          Задать вопрос
        </Link>
      )}
      <div className={ss.block}>
        <h5>Меню</h5>
        <ul className={ss.nav}>
          <li
            className={classNames('hover', ss.item, {
              [ss.active]: router.pathname === '/',
            })}
          >
            <Link href="/">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#questions2" />
              </svg>
              <p>Все вопросы</p>
            </Link>
          </li>
          <li className={`hover ${ss.item}`}>
            <Link href="#">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#fire" />
              </svg>
              <p>Мои предпочтения</p>
            </Link>
          </li>
          <li
            className={classNames('hover', ss.item, {
              [ss.active]: router.pathname === '/my',
            })}
          >
            <Link href="/my">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#questions" />
              </svg>
              <p>Мои вопросы</p>
            </Link>
          </li>
          <li
            className={classNames('hover', ss.item, {
              [ss.active]: router.pathname === '/favorites',
            })}
          >
            <Link href="/favorites">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#favorite" />
              </svg>
              <p>Мое избранное</p>
            </Link>
          </li>
          <li className={`hover ${ss.item}`}>
            <Link href="#">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#subcribe" />
              </svg>
              <p>Отслеживаемое</p>
            </Link>
          </li>
          <li
            className={classNames('hover', ss.item, {
              [ss.active]: router.pathname === '/tags',
            })}
          >
            <Link href="/tags">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#tags" />
              </svg>
              <p>Все метки</p>
            </Link>
          </li>
          <li
            className={classNames('hover', ss.item, {
              [ss.active]: router.pathname === '/users',
            })}
          >
            <Link href="/users">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#users" />
              </svg>
              <p>Все пользователи</p>
            </Link>
          </li>
        </ul>
      </div>

      <div className={ss.block}>
        <h5>Топ меток</h5>
        <ul className={ss.tagList}>
          {tags.map((obj) => (
            <li key={obj.id} className={`hover tag ${ss.tag}`}>
              <Link href={`/?tagBy=${obj.name}`}>{obj.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Sticky>
  );
};