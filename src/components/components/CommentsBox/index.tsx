import ss from "./CommentsBox.module.scss";
import { Comments, Textarea } from "@/components";
import { useSelectors } from "@/hooks/useSelectors";
import { Api } from "@/utils/api";
import { TComment } from "@/utils/api/models/comments/types";
import React from "react";

interface CommentsBoxProps {
  questionId?: number;
  answerId?: number;
  commentValue: string;
  setCommentValue: (value: string) => void;
  openInput?: boolean;
  setOpenInput?: (value: boolean) => void;
  className?: string;
}

export const CommentsBox: React.FC<CommentsBoxProps> = ({
  questionId,
  answerId,
  commentValue,
  setCommentValue,
  openInput,
  setOpenInput,
  className,
}) => {
  const { data: userData } = useSelectors((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openComments, setOpenComments] = React.useState(false);
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
        alert("Ошибка при получении комментариев");
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
      setComments([{ ...comment, user: userData }, ...comments]);
      setOpenComments(true);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании комментария");
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeComment = async (commentId: number, value: string) => {
    setCommentValue(value);
  };

  if ((!!questionId && openInput) || !!answerId) {
    return (
      <div className={`${className} ${ss.comments}`}>
        <Comments
          comments={comments}
          setComments={setComments}
          isOpen={openComments}
          setIsOpen={setOpenComments}
          onChangeComment={onChangeComment}
          isQuestion={!!questionId}
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
