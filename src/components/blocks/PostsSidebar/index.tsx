import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { useSelectors } from '@/hooks/useSelectors';
import { Api } from '@/utils/api';
import { TPost } from '@/utils/api/models/post/types';

import { PostSidebarLoading } from '../LoadingElem/PostSidebarLoading';
import { PostSidebar } from './PostSidebar';
import ss from './PostsSidebar.module.scss';

interface PostsSidebarProps {}

export const PostsSidebar: React.FC<PostsSidebarProps> = ({}) => {
  const router = useRouter();
  const [posts, setPosts] = React.useState<TPost[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { data: userData } = useSelectors((state) => state.user);

  React.useEffect(() => {
    (async () => {
      try {
        const params = {
          limit: 4,
          page: 1,
          orderBy: 'date',
          isShort: true,
        };
        const posts = await Api().post.getAll(params);
        setPosts(posts.items);
      } catch (err) {
        console.warn(err);
        alert('Ошибка при получение постов в сайдбаре');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <aside className={ss.sidebar}>
      <Link href="/posts/create" className={`btn ${ss.btn}`}>
        Создать пост
      </Link>

      <div className={ss.block}>
        <h5 className={ss.title}>Меню</h5>
        <div className={`sidebar ${ss.nav}`}>
          <Link
            href="/feed"
            className={classNames('hover item', ss.item, {
              active: router.pathname === '/forum',
            })}
          >
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#questions2" />
            </svg>
            <p>Все посты</p>
          </Link>
          {!userData?.isAdmin && (
            <>
              <Link
                href="/feed/my"
                className={classNames('hover item', ss.item, {
                  active: router.pathname === '/forum/my',
                })}
              >
                <svg width="20" height="20">
                  <use xlinkHref="../img/icons/icons.svg#questions" />
                </svg>
                <p>Мои посты</p>
              </Link>
              <Link
                href="/feed/favorites"
                className={classNames('hover item', ss.item, {
                  active: router.pathname === '/forum/favorites',
                })}
              >
                <svg width="20" height="20">
                  <use xlinkHref="../img/icons/icons.svg#favorite" />
                </svg>
                <p>Мое избранное</p>
              </Link>
            </>
          )}
          <Link
            href="/feed/categories"
            className={classNames('hover item', ss.item, {
              active: router.pathname === '/forum/tags',
            })}
          >
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#users" />
            </svg>
            <p>Все категории</p>
          </Link>
          <Link
            href="/feed/tags"
            className={classNames('hover item', ss.item, {
              active: router.pathname === '/forum/users',
            })}
          >
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#tags" />
            </svg>
            <p>Все метки</p>
          </Link>
        </div>
      </div>

      <div className={ss.block}>
        <div className={ss.title}>Популярные посты за сегодня</div>
        <ul className={ss.post__list}>
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => <PostSidebarLoading key={index} />)
            : posts.map((obj) => <PostSidebar key={obj.id} post={obj} />)}
        </ul>
      </div>
    </aside>
  );
};
