import { MetaLayout } from '@/layouts/MetaLayout';
import { PostsLayout } from '@/layouts/PostsLayout';
import { NextPage } from 'next';

interface FeedPageProps {
  
};

const FeedPage: NextPage<FeedPageProps> = ({  }) => {

  return (
    <MetaLayout title="Лента">
      <PostsLayout>
        <></>
      </PostsLayout>
    </MetaLayout>
  );
};

export default FeedPage;