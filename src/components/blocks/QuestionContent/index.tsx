import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import { CommentsBox, Popup, QuestionBody, UserBox } from '@/components';
import { useFormatNumber } from '@/hooks/useFormatNumber';
import { useTimeNow } from '@/hooks/useTimeNow';
import { useWordEnding } from '@/hooks/useWordEnding';
import { Api } from '@/utils/api';
import { TComment } from '@/utils/api/models/comments/types';
import { TQuestion } from '@/utils/api/models/question/types';

import ss from './QuestionContent.module.scss';

interface QuestionContentProps {
  question: TQuestion;
}

export const QuestionContent: React.FC<QuestionContentProps> = ({
  question,
}) => {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const router = useRouter();
  const [openComments, setOpenComments] = React.useState(false);
  const [commentValue, setCommentValue] = React.useState('');
  const [comments, setComments] = React.useState<TComment[]>([]);
  const viewsCount = useWordEnding(question.views, 'просмотр');
  const answersCount = useWordEnding(question.answerCount, 'ответ');

  const onRemoveQuestion = async () => {
    if (window.confirm('Вы действительно хотите удалить вопрос')) {
      try {
        await Api().question.remove(question.id);
        await router.push('/');
      } catch (err) {
        console.warn(err);
        alert('Ошибка при удалении вопроса');
      }
    } else {
      setVisiblePopup(false);
    }
  };

  const onOpenInput = () => {
    setOpenComments(!openComments);
    setCommentValue('');
  };

  React.useEffect(() => {
    (async () => {
      try {
        const params = {
          questionId: question.id,
        };
        const comments = await Api().comment.getAll(params);
        setComments(comments.items);
      } catch (err) {
        console.warn(err);
        alert('Ошибка при получении комментариев');
      }
    })();
  }, []);

  return (
    <div className={ss.question}>
      <div className={ss.header}>
        <div className={ss.header__item}>
          {question.updated !== question.createdAt
            ? `Изменен (${useTimeNow(question.updated)})`
            : useTimeNow(question.createdAt)}
        </div>
        <div className={`${ss.header__item} ${ss.eye}`}>
          <p>{viewsCount}</p>
        </div>
        <div className={ss.header__item}>
          <p>{answersCount}</p>
        </div>
      </div>
      <Popup
        type="question"
        className={ss.popup}
        isVisible={visiblePopup}
        setIsVisible={setVisiblePopup}
        onRemove={onRemoveQuestion}
        userId={question.user.id}
        questionId={question.id}
      />

      <h1
        className={classNames(ss.title, {
          [ss.long]: question.title.length > 100,
        })}
      >
        {question.title}
      </h1>

      <div className={ss.underTitle}>
        <UserBox user={question.user} className={ss.user} />

        <div className={ss.tags__wrapper}>
          <ul className={ss.tagList}>
            {question.tags.map((obj) => (
              <li key={obj.id} className={`tag hover ${ss.tag}`}>
                <a href={`/?tagby${obj.name}`}>{obj.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <QuestionBody body={question.body} />

      <div className={ss.footer}>
        <div className={`inline ${ss.footer__btn}`}>Подписаться</div>
        <div
          onClick={onOpenInput}
          className={classNames('inline', ss.footer__btn, {
            [ss.active]: openComments,
          })}
        >
          Комментарии {!!comments.length && `(${comments.length})`}
        </div>
      </div>
      {openComments && (
        <div className={`block ${ss.comments__wrapper}`}>
          <CommentsBox
            questionId={question.id}
            openInput={openComments}
            onOpenInput={onOpenInput}
            commentValue={commentValue}
            setCommentValue={setCommentValue}
            className={ss.comments}
          />
        </div>
      )}
    </div>
  );
};
