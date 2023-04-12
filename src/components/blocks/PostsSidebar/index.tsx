import Link from 'next/link';
import React from 'react';

import { Api } from '@/utils/api';
import { TPost } from '@/utils/api/models/post/types';

import { PostSidebarLoading } from '../LoadingElem/PostSidebarLoading';
import { PostSidebar } from './PostSidebar';
import ss from './PostsSidebar.module.scss';

interface PostsSidebarProps {}

export const PostsSidebar: React.FC<PostsSidebarProps> = ({}) => {
  const [posts, setPosts] = React.useState<TPost[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

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

      <div className={ss.title}>Популярные посты за сегодня</div>

      <ul className={ss.post__list}>
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, index) => <PostSidebarLoading key={index} />)
          : posts.map((obj) => <PostSidebar key={obj.id} post={obj} />)}
      </ul>
    </aside>
  );
};
