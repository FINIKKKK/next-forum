import React from 'react';

import ss from './LoadingElem.module.scss';

interface PostLoadingProps {
  className?: string;
}

export const PostLoading: React.FC<PostLoadingProps> = ({ className }) => {
  return (
    <div className={ss.post}>
      <div className={`${ss.img} ${ss.loading}`}></div>

      <div className={ss.info}>
        <div className={`${ss.category} ${ss.loading}`}></div>

        <div className={`${ss.info__extra} ${ss.loading}`}></div>
      </div>

      <div className={`${ss.title} ${ss.loading}`}></div>

      <div className={`${ss.description} ${ss.loading}`}></div>

      <div className={ss.footer}>
        <div className={`${ss.tags} ${ss.loading}`}></div>

        <div className={`${ss.statistic} ${ss.loading}`}></div>
      </div>
    </div>
  );
};
