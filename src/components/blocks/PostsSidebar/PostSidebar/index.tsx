import Link from 'next/link';
import React from 'react';

import { useTimeNow } from '@/hooks/useTimeNow';
import { TCategory } from '@/utils/api/models/category/types';

import ss from './PostSidebar.module.scss';

interface PostSidebarProps {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  category: TCategory;
}

export const PostSidebar: React.FC<PostSidebarProps> = ({
  slug,
  title,
  description,
  createdAt,
  category,
}) => {
  const date = useTimeNow(createdAt);

  return (
    <li className={ss.post}>
      <h5>
        <Link href={`/posts/${slug}`}>{title}</Link>
      </h5>
      <p>{description}</p>
      <div className={ss.footer}>
        <Link href={`/feed?category=${category.id}`} className={ss.category}>
          {category.label}
        </Link>
        <div className={ss.date}>{date}</div>
      </div>
    </li>
  );
};
