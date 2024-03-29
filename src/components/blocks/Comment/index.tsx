import React from 'react';

import { Textarea } from '@/components';
import { useSelectors } from '@/hooks/useSelectors';
import { Api } from '@/utils/api';
import { TComment } from '@/utils/api/models/comment/types';
import { TUser } from '@/utils/api/models/user/types';

import ss from './Comment.module.scss';

interface CommentProps {
  id: number;
  text: string;
  user: TUser;
  comments: TComment[];
  setComments: (value: (prev: TComment[]) => TComment[]) => void;
  setVisibleTextarea?: (value: boolean) => void;
}

export const Comment: React.FC<CommentProps> = ({
  id,
  text,
  user,
  comments,
  setComments,
  setVisibleTextarea,
}) => {
  const { data: userData } = useSelectors((state) => state.user);
  const [openInput, setOpenInput] = React.useState(false);
  const [value, setValue] = React.useState(text);

  const onRemoveComment = async () => {
    if (window.confirm('Вы действительно хотите удалить комментарий')) {
      try {
        await Api().comment.remove(id);
        setComments((prev: TComment[]) => prev.filter((obj) => obj.id !== id));
      } catch (err) {
        console.warn(err);
        alert('Ошибка при удалении комментария');
      }
    }
  };

  const onChangeComment = async () => {
    try {
      const dto = {
        text: value,
      };
      const comment = await Api().comment.update(id, dto);
      setOpenInput(false);
      const newItems = comments.map((obj) => {
        if (obj.id === id) {
          return comment;
        }
        return obj;
      });
      setComments(() => newItems);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при изменении комментария');
    }
  };

  const onOpenInput = () => {
    setOpenInput(!openInput);
    setValue(text);
    setVisibleTextarea && setVisibleTextarea(false);
  };

  return (
    <div className={ss.comment}>
      {!openInput ? (
        <p className={ss.text}>
          <b>@{user.login}</b> – {text}
        </p>
      ) : (
        <Textarea
          className={ss.input}
          value={value}
          setValue={setValue}
          onSubmit={onChangeComment}
        />
      )}
      {(userData?.id === user.id || userData?.isAdmin) && (
        <div className={ss.icons}>
          <svg onClick={onOpenInput} className={ss.edit} width="20" height="20">
            <use xlinkHref="../img/icons/icons.svg#edit" />
          </svg>
          {!openInput && (
            <svg
              onClick={onRemoveComment}
              className={ss.remove}
              width="20"
              height="20"
            >
              <use xlinkHref="../img/icons/icons.svg#close" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};
