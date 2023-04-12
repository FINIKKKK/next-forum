import { NextPage } from 'next';
import React from 'react';

import { Pagination, Post } from '@/components';
import { MetaLayout } from '@/layouts/MetaLayout';
import { PostsLayout } from '@/layouts/PostsLayout';
import { Api } from '@/utils/api';
import { TPost } from '@/utils/api/models/post/types';

interface FeedPageProps {}

const FeedPage: NextPage<FeedPageProps> = ({}) => {
  const limit = 2;
  const [posts, setPosts] = React.useState<TPost[]>([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      try {
        const params = {
          limit,
          page,
          orderBy: 'date',
        };
        const { items, total } = await Api().post.getAll(params);
        setPosts(items);
        setTotal(total);
      } catch (err) {
        console.warn(err);
        alert('Ошибка при получении постов');
      }
    })();
  }, [page]);

  return (
    <MetaLayout title="Лента">
      <PostsLayout>
        <div className="posts">
          {posts.map((obj) => (
            <Post key={obj.id} post={obj} />
          ))}

          <Pagination
            className="pagination"
            page={page}
            setPage={setPage}
            total={total}
            limit={limit}
          />
        </div>
      </PostsLayout>
    </MetaLayout>
  );
};

export default FeedPage;
