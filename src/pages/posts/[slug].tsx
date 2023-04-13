import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

import { MetaLayout } from '@/layouts/MetaLayout';
import { Post } from '@/screens/Post';
import { Api } from '@/utils/api';
import { TComment } from '@/utils/api/models/comment/types';
import { TPost } from '@/utils/api/models/post/types';

interface PostPageProps {
  post: TPost;
  comments: TComment[];
}

const PostPage: NextPage<PostPageProps> = ({ post, comments }) => {
  console.log(post);
  return (
    <MetaLayout title={`${post.title}`} description={post.description} noTitle>
      <Post post={post} comments={comments} />
    </MetaLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const slug = ctx?.params?.slug;
    if (slug) {
      const post = await Api().post.getOne(slug);
      const comments = await Api().comment.getAll({ postId: post.id });
      return {
        props: {
          post,
          comments,
        },
      };
    } else {
      return {
        props: {},
      };
    }
  } catch (err) {
    console.warn(err);
    return {
      props: {},
    };
  }
};

export default PostPage;
