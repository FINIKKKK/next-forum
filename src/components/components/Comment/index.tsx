import React from "react";

import { TUser } from "@/utils/api/models/user/types";

import ss from "./Comment.module.scss";
import { Api } from "@/utils/api";
import { TComment } from "@/utils/api/models/comments/types";
import { useSelectors } from "@/hooks/useSelectors";

interface CommentProps {
  id: number;
  text: string;
  user: TUser;
  setComments: (value: TComment) => TComment[];
}

export const Comment: React.FC<CommentProps> = ({
  id,
  text,
  user,
  setComments,
}) => {
  const { data: userData } = useSelectors((state) => state.user);
  const [openInput, setOpenInput] = React.useState(false);
  const [value, setValue] = React.useState(text);

  const onRemoveComment = async () => {
    if (window.confirm("Вы действительно хотите удалить комментарий")) {
      try {
        await Api().comment.remove(id);
        setComments((prev: TComment[]) => prev.filter((obj) => obj.id !== id));
      } catch (err) {
        console.warn(err);
        alert("Ошибка при удалении комментария");
      }
    }
  };

  const onChangeComment = async () => {
    try {
      await Api().comment.remove(id);
      setComments((prev: TComment[]) => prev.filter((obj) => obj.id !== id));
    } catch (err) {
      console.warn(err);
      alert("Ошибка при удалении комментария");
    }
  };

  return (
    <div className={ss.comment}>
      {!openInput ? (
        <p className={ss.text}>
          <b>@{user.login}</b> – {text}
        </p>
      ) : (
        <textarea
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
        ></textarea>
      )}
      {userData?.id === user.id && (
        <div className={ss.icons}>
          <svg
            onClick={() => setOpenInput(!openInput)}
            className={ss.edit}
            width="20"
            height="20"
          >
            <use xlinkHref="../img/icons/icons.svg#edit" />
          </svg>
          <svg
            onClick={onRemoveComment}
            className={ss.remove}
            width="20"
            height="20"
          >
            <use xlinkHref="../img/icons/icons.svg#close" />
          </svg>
        </div>
      )}
    </div>
  );
};
