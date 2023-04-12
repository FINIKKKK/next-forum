import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Sticky from 'react-stickynode';

import { useBottomBoundary } from '@/hooks/useBottomBoundary';
import { useSelectors } from '@/hooks/useSelectors';
import { Api } from '@/utils/api';
import { TTag } from '@/utils/api/models/tag/types';

import ss from './Sidebar.module.scss';

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const [tags, setTags] = React.useState<TTag[]>([]);
  const router = useRouter();
  const { data: userData } = useSelectors((state) => state.user);
  const [bottomBord, setBottomBord] = React.useState<number | null>(null);
  useBottomBoundary(setBottomBord);

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
      bottomBoundary={bottomBord ? bottomBord : 'window'}
      className={`sidebar ${ss.sidebar}`}
    >
      {userData && !userData?.isAdmin && (
        <Link href="/questions/create" className={`btn ${ss.btn}`}>
          Задать вопрос
        </Link>
      )}
      <div className={ss.block}>
        <h5>Меню</h5>
        <div className={`sidebar ${ss.nav}`}>
          <Link
            href="/forum"
            className={classNames('hover item', ss.item, {
              active: router.pathname === '/forum',
            })}
          >
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#questions2" />
            </svg>
            <p>Все вопросы</p>
          </Link>
          {!userData?.isAdmin && (
            <>
              <Link
                href="/forum/recomended"
                className={classNames('hover item', ss.item, {
                  active: router.pathname === '/forum/recomended',
                })}
              >
                <svg width="20" height="20">
                  <use xlinkHref="../img/icons/icons.svg#fire" />
                </svg>
                <p>Мои предпочтения</p>
              </Link>
              <Link
                href="/forum/my"
                className={classNames('hover item', ss.item, {
                  active: router.pathname === '/forum/my',
                })}
              >
                <svg width="20" height="20">
                  <use xlinkHref="../img/icons/icons.svg#questions" />
                </svg>
                <p>Мои вопросы</p>
              </Link>

              <Link
                href="/forum/favorites"
                className={classNames('hover item', ss.item, {
                  active: router.pathname === '/forum/favorites',
                })}
              >
                <svg width="20" height="20">
                  <use xlinkHref="../img/icons/icons.svg#favorite" />
                </svg>
                <p>Мое избранное</p>
              </Link>
              <Link
                href="/forum/subscribe"
                className={classNames('hover item', ss.item, {
                  active: router.pathname === '/forum/subscribe',
                })}
              >
                <svg width="20" height="20">
                  <use xlinkHref="../img/icons/icons.svg#subcribe" />
                </svg>
                <p>Отслеживаемое</p>
              </Link>
            </>
          )}
          <Link
            href="/forum/tags"
            className={classNames('hover item', ss.item, {
              active: router.pathname === '/forum/tags',
            })}
          >
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#tags" />
            </svg>
            <p>Все метки</p>
          </Link>
          <Link
            href="/forum/users"
            className={classNames('hover item', ss.item, {
              active: router.pathname === '/forum/users',
            })}
          >
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#users" />
            </svg>
            <p>Все пользователи</p>
          </Link>
        </div>
      </div>

      {tags.length > 0 && (
        <div className={ss.block}>
          <h5>Топ меток</h5>
          <ul className={ss.tagList}>
            {tags.map((obj) => (
              <li key={obj.id} className={`hover tag ${ss.tag}`}>
                <Link href={`/forum/?tagBy=${obj.name}`}>{obj.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Sticky>
  );
};
