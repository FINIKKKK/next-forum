import ss from "./Comments.module.scss";
import { Comment } from "@/components";
import { TComment } from "@/utils/api/models/comments/types";
import React from "react";

interface CommentsProps {
  comments: TComment[];
  setComments: any;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onChangeComment: any;
  isQuestion?: boolean;
}

export const Comments: React.FC<CommentsProps> = ({
  comments,
  setComments,
  isOpen,
  setIsOpen,
  onChangeComment,
  isQuestion,
}) => {
  return (
    <div className={ss.comments}>
      {!isQuestion && (
        <button
          onClick={() => setIsOpen(!isOpen)}
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
            />
          ))}
        </div>
      )}
    </div>
  );
};
