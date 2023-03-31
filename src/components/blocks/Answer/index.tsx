import { OutputBlockData } from '@editorjs/editorjs';
import classNames from 'classnames';
import React from 'react';

import {
  CommentsBox,
  Popup,
  QuestionBody,
  Rating,
  UserBox,
} from '@/components';
import { useTimeNow } from '@/hooks/useTimeNow';
import { Api } from '@/utils/api';
import { TAnswer } from '@/utils/api/models/answer/types';

import ss from './Answer.module.scss';

interface AnswerProps {
  answer: TAnswer;
  isAuthor: boolean;
  setAnswers: (value: any) => void;
  changeIsAnswer: (value: number) => void;
  solvedAnswerId: number | null;
  setSolvedAnswerId: (value: number) => void;
  setUpdadeAnswer: (value: OutputBlockData[]) => void;
}

export const Answer: React.FC<AnswerProps> = ({
  answer,
  isAuthor,
  setAnswers,
  changeIsAnswer,
  solvedAnswerId,
  setSolvedAnswerId,
  setUpdadeAnswer,
}) => {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [openInput, setOpenInput] = React.useState(false);
  const [commentValue, setCommentValue] = React.useState('');
  const [openComments, setOpenComments] = React.useState(false);
  const [isSolved, setIsSolved] = React.useState(
    solvedAnswerId === answer.id ? true : false,
  );
  const date = useTimeNow(answer.createdAt);

  React.useEffect(() => {
    if (answer.isAnswer) {
      setSolvedAnswerId(answer.id);
      setIsSolved(true);
    }
  }, []);

  React.useEffect(() => {
    if (solvedAnswerId === answer.id) {
      setIsSolved(true);
    } else {
      setIsSolved(false);
    }
  }, [solvedAnswerId]);

  const onRemoveAnswer = async () => {
    if (window.confirm('Вы действительно хотите удалить ответ?')) {
      try {
        await Api().answer.remove(answer.id);
        setAnswers((prev: any) =>
          prev.filter((obj: any) => obj.id !== answer.id),
        );
      } catch (err) {
        console.warn(err);
        alert('Ошибка при удалении ответа');
      }
    } else {
      setVisiblePopup(false);
    }
  };

  const onSetIsAnswer = async () => {
    try {
      setIsSolved(false);
      changeIsAnswer(answer.id);
      if (solvedAnswerId === answer.id) {
        await Api().answer.updateIsAnswer(answer.id, {
          questionId: answer.question.id,
          isAnswer: false,
        });
        await Api().question.update(answer.question.id, {
          isAnswer: false,
        });
      } else {
        await Api().answer.updateIsAnswer(answer.id, {
          questionId: answer.question.id,
          isAnswer: true,
        });
        await Api().question.update(answer.question.id, {
          isAnswer: true,
        });
      }
    } catch (err) {
      console.warn(err);
      alert('Ошибка при изменении статуса');
    }
  };

  const onOpenInput = () => {
    setOpenInput(!openInput);
    setCommentValue('');
    setOpenComments(true);
  };

  const onChange = () => {
    setUpdadeAnswer(answer.body);
  };

  return (
    <div className={ss.answer}>
      <div className={ss.side}>
        <Rating id={answer.id} rating={answer.rating} />
        {(isSolved || isAuthor) && (
          <svg
            onClick={onSetIsAnswer}
            className={classNames(ss.isAnswer__icon, {
              [ss.active]: isSolved,
              [ss.disabled]: !isAuthor,
            })}
            width="20"
            height="20"
          >
            <use xlinkHref="../img/icons/icons.svg#check" />
          </svg>
        )}
      </div>

      <div className={ss.content}>
        <Popup
          type="answer"
          isVisible={visiblePopup}
          setIsVisible={setVisiblePopup}
          onRemove={onRemoveAnswer}
          onChange={onChange}
          userId={answer.user.id}
        />

        <div className={ss.header}>
          <div className={ss.header__info}>
            <UserBox className={ss.user} user={answer.user} />
            {isSolved && (
              <div className={`bb ${ss.isAnswer}`}>
                <p>Ответ</p>
                <svg width="20" height="20">
                  <use xlinkHref="../img/icons/icons.svg#check" />
                </svg>
              </div>
            )}
          </div>
          <div className={ss.date}>
            {answer.updated !== answer.createdAt
              ? `Изменен (${useTimeNow(answer.updated)})`
              : date}
          </div>
        </div>

        <QuestionBody body={answer.body} />

        <div className={ss.footer}>
          <button onClick={onOpenInput} className={`btn ${ss.btn}`}>
            {!openInput ? 'Ответить' : 'Закрыть'}
          </button>
          <CommentsBox
            answerId={answer.id}
            openInput={openInput}
            setOpenInput={setOpenInput}
            commentValue={commentValue}
            setCommentValue={setCommentValue}
            openComments={openComments}
            setOpenComments={setOpenComments}
          />
        </div>
      </div>
    </div>
  );
};
