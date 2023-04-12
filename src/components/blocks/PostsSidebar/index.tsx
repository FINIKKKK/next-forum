import Link from 'next/link';
import React from 'react';
import Sticky from 'react-stickynode';

import { NotFound } from '@/components/UI/NotFound';
import { useBottomBoundary } from '@/hooks/useBottomBoundary';
import { Api } from '@/utils/api';
import { TPost } from '@/utils/api/models/post/types';

import { PostSidebar } from './PostSidebar';
import ss from './PostsSidebar.module.scss';

interface PostsSidebarProps {}

export const PostsSidebar: React.FC<PostsSidebarProps> = ({}) => {
  const [posts, setPosts] = React.useState<TPost[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [bottomBord, setBottomBord] = React.useState<number | null>(null);
  useBottomBoundary(setBottomBord);

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
    <Sticky
      top={45}
      bottomBoundary={bottomBord ? bottomBord : 'window'}
      className={ss.sidebar}
    >
      <Link href="/posts/create" className={`btn ${ss.btn}`}>
        Создать пост
      </Link>

      <div className={ss.title}>Популярные посты за сегодня</div>

      <ul className={ss.post__list}>
        {posts.length > 0 ? (
          posts.map((obj) => <PostSidebar key={obj.id} post={obj} />)
        ) : (
          <NotFound />
        )}
      </ul>
    </Sticky>
  );
};
