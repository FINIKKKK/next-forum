import React from 'react';

import { Comment } from '@/components';
import { TComment } from '@/utils/api/models/comment/types';

import ss from './Comments.module.scss';

interface CommentsProps {
  comments: TComment[];
  setComments: any;
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
  onChangeComment: any;
  isQuestion?: boolean;
  setVisibleTextarea?: (value: boolean) => void;
}

export const Comments: React.FC<CommentsProps> = ({
  comments,
  setComments,
  isOpen,
  setIsOpen,
  onChangeComment,
  isQuestion,
  setVisibleTextarea,
}) => {
  return (
    <div className={ss.comments}>
      {!isQuestion && (
        <button
          onClick={() => setIsOpen && setIsOpen(!isOpen)}
          className={`inline ${ss.btn}`}
        >
          Комментарии ({comments.length})
        </button>
      )}
      {(isOpen || isQuestion) && (
        <div className={ss.list}>
          {comments.map((obj) => (
            <Comment
              key={obj.id}
              {...obj}
              comments={comments}
              setComments={setComments}
              onChangeComment={onChangeComment}
              setVisibleTextarea={setVisibleTextarea}
            />
          ))}
        </div>
      )}
    </div>
  );
};
