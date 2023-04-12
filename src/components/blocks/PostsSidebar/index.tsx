import Link from 'next/link';
import React from 'react';

import { NotFound } from '@/components/UI/NotFound';
import { Api } from '@/utils/api';
import { TPost } from '@/utils/api/models/post/types';

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
    <div className={ss.sidebar}>
      <Link href="/posts/create" className={`btn ${ss.btn}`}>
        Создать пост
      </Link>

      <div className={ss.title}>Популярные посты за сегодня</div>

      <ul className={ss.post__list}>
        {posts.length > 0 ? (
          posts.map((obj) => <PostSidebar key={obj.id} {...obj} />)
        ) : (
          <NotFound />
        )}
      </ul>
    </div>
  );
};
