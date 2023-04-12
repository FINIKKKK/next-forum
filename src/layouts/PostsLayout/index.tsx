import { PostsSidebar } from '@/components';
import React from 'react';

import { MainLayout } from '../MainLayout';
import ss from './PostsLayout.module.scss';

type PostsLayoutsProps = {
  children: React.ReactNode;
};

export const PostsLayout: React.FC<PostsLayoutsProps> = ({ children }) => {
  return (
    <MainLayout>
      <div className={ss.posts}>
        <div className="container">
          <div className={ss.inner}>
            <div className={`block ${ss.main}`}>{children}</div>
            <PostsSidebar />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
