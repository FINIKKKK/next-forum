import React from "react";

import ss from "./Comments.module.scss";

interface CommentsProps {}

export const Comments: React.FC<CommentsProps> = ({}) => {
  return (
    <div className={ss.comments}>
      <button className={`inline ${ss.btn}`}>Комментарии (2)</button>
      <div className={ss.comments}>
        <p className={ss.comment}>
          <b>Dmitriy Bozhko</b> - Если коротко - то в базе данных.
        </p>
        <p className={ss.comment}>
          <b>Dmitriy Bozhko</b> - Если коротко - то в базе данных.
        </p>
      </div>
    </div>
  );
};
