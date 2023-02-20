import React from "react";

import { TComment } from "@/utils/api/models/comments/types";

import ss from "./Comments.module.scss";

interface CommentsProps {
  comments: TComment[];
}

export const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={ss.comments}>
      <button onClick={() => setIsOpen(!isOpen)} className={`inline ${ss.btn}`}>
        Комментарии ({comments.length})
      </button>
      {isOpen && (
        <div className={ss.comments}>
          {comments.map((obj) => (
            <p key={obj.id} className={ss.comment}>
              <b>@{obj.user.login}</b> - {obj.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
