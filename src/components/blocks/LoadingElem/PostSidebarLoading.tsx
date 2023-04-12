import React from 'react';

import ss from './LoadingElem.module.scss';

interface PostSidebarLoadingProps {
  className?: string;
}

export const PostSidebarLoading: React.FC<PostSidebarLoadingProps> = ({
  className,
}) => {
  return (
    <div className={ss.mini_post}>
      <div className={`${ss.title} ${ss.loading}`}></div>

      <div className={`${ss.description} ${ss.loading}`}></div>

      <div className={ss.footer}>
        <div className={`${ss.category} ${ss.loading}`}></div>

        <div className={`${ss.date} ${ss.loading}`}></div>
      </div>
    </div>
  );
};
