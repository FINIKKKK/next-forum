import Link from 'next/link';
import React from 'react';

import { useTimeNow } from '@/hooks/useTimeNow';
import { TPost } from '@/utils/api/models/post/types';

import ss from './PostSidebar.module.scss';

interface PostSidebarProps {
  post: TPost;
}

export const PostSidebar: React.FC<PostSidebarProps> = ({ post }) => {
  const date = useTimeNow(post.createdAt);

  return (
    <li className={ss.post}>
      <h5>
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h5>
      <p>{post.description}</p>
      <div className={ss.footer}>
        <Link
          href={`/feed?category=${post.category.id}`}
          className={ss.category}
        >
          {post.category.label}
        </Link>
        <div className={ss.date}>{date}</div>
      </div>
    </li>
  );
};
