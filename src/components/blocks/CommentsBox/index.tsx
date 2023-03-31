import React from 'react';

import { Comments, Textarea } from '@/components';
import { useSelectors } from '@/hooks/useSelectors';
import { Api } from '@/utils/api';
import { TComment } from '@/utils/api/models/comments/types';

import ss from './CommentsBox.module.scss';

interface CommentsBoxProps {
  questionId?: number;
  answerId?: number;
  commentValue: string;
  setCommentValue: (value: string) => void;
  openInput?: boolean;
  onOpenInput?: () => void;
  setOpenInput?: (value: boolean) => void;
  className?: string;
  openComments?: boolean;
  setOpenComments?: (value: boolean) => void;
}

export const CommentsBox: React.FC<CommentsBoxProps> = ({
  questionId,
  answerId,
  commentValue,
  setCommentValue,
  openInput,
  setOpenInput,
  className,
  openComments,
  setOpenComments,
}) => {
  const { data: userData } = useSelectors((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(false);
  const [comments, setComments] = React.useState<TComment[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const params = {
          answerId,
          questionId,
        };
        const comments = await Api().comment.getAll(params);
        setComments(comments.items);
      } catch (err) {
        console.warn(err);
        alert('Ошибка при получении комментариев');
      }
    })();
  }, []);

  const onCreateComment = async () => {
    try {
      setIsLoading(true);
      const dto = {
        text: commentValue,
        ...(answerId ? { answerId } : {}),
        ...(questionId ? { questionId } : {}),
      };
      const comment = await Api().comment.create(dto);
      setOpenInput && setOpenInput(false);
      setComments([{ ...comment, user: userData! }, ...comments]);
      setOpenComments && setOpenComments(true);
      setCommentValue && setCommentValue('');
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании комментария');
    } finally {
      setIsLoading(false);
    }
  };

  if ((!!questionId && openInput) || !!answerId) {
    return (
      <div className={`${className} ${ss.comments}`}>
        <Comments
          comments={comments}
          setComments={setComments}
          isOpen={openComments}
          setIsOpen={setOpenComments}
          onChangeComment={(value: string) => setCommentValue(value)}
          isQuestion={!!questionId}
          setVisibleTextarea={setOpenInput}
        />
        {(openInput || !!questionId) && (
          <Textarea
            value={commentValue}
            setValue={setCommentValue}
            onSubmit={onCreateComment}
          />
        )}
      </div>
    );
  } else {
    return <></>;
  }
};
