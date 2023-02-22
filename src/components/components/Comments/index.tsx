import React from "react";

import { Comment } from "@/components";
import { TComment } from "@/utils/api/models/comments/types";

import ss from "./Comments.module.scss";

interface CommentsProps {
  comments: TComment[];
  setComments: (value: TComment) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onChangeComment: any;
}

export const Comments: React.FC<CommentsProps> = ({
  comments,
  setComments,
  isOpen,
  setIsOpen,
  onChangeComment,
}) => {
  return (
    <div className={ss.comments}>
      <button onClick={() => setIsOpen(!isOpen)} className={`inline ${ss.btn}`}>
        Комментарии ({comments.length})
      </button>
      {isOpen && (
        <div className={ss.list}>
          {comments.map((obj) => (
            <Comment
              key={obj.id}
              {...obj}
              comments={comments}
              setComments={setComments}
              onChangeComment={onChangeComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};
