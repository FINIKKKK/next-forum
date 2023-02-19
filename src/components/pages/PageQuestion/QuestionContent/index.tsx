import React from "react";

import { QuestionBody, UserBox } from "@/components";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useSelectors } from "@/hooks/useSelectors";
import { useTimeNow } from "@/hooks/useTimeNow";
import { TQuestion } from "@/utils/api/models/question/types";

import ss from "./QuestionContent.module.scss";

interface QuestionContentProps {
  question: TQuestion;
}

export const QuestionContent: React.FC<QuestionContentProps> = ({
  question,
}) => {
  const { data } = useSelectors((state) => state.user);
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const refPopup = React.useRef<HTMLDivElement>(null);

  useOutsideClick(refPopup, setVisiblePopup);

  return (
    <div className={ss.question}>
      <div className={ss.header}>
        <div className={ss.header__item}>{useTimeNow(question.createdAt)}</div>
        <div className={`${ss.header__item} ${ss.eye}`}>
          <svg width="20" height="20">
            <use xlinkHref="../img/icons/icons.svg#eye" />
          </svg>
          <p>{question.views}</p>
        </div>
        <div className={ss.header__item}>
          <svg width="20" height="20">
            <use xlinkHref="../img/icons/icons.svg#answers" />
          </svg>
          <p>3</p>
        </div>
        <div className={`${ss.header__item} ${ss.favorite}`}>
          <svg width="20" height="20">
            <use xlinkHref="../img/icons/icons.svg#favorite2" />
          </svg>
          <p>0</p>
        </div>
      </div>

      <div ref={refPopup} className="popup__wrapper">
        <svg
          onClick={() => setVisiblePopup(!visiblePopup)}
          className={ss.options}
          width="20"
          height="20"
        >
          <use xlinkHref="../img/icons/icons.svg#options" />
        </svg>
        {visiblePopup && (
          <div className="popup block">
            {data?.id !== question.user.id ? (
              <>
                <div className="popup__item">Пожаловаться</div>
              </>
            ) : (
              <>
                <div className="popup__item">
                  <a href={`/create/${question.id}`}>Редактировать</a>
                </div>
                <div className="popup__item">Удалить</div>
              </>
            )}
          </div>
        )}
      </div>

      <h1 className={ss.title}>{question.title}</h1>

      <ul className={ss.tagList}>
        {question.tags.map((obj) => (
          <li key={obj.id} className={`tag hover ${ss.tag}`}>
            <a href="#">{obj.name}</a>
          </li>
        ))}
      </ul>

      <UserBox user={question.user} />

      <QuestionBody body={question.body} />

      <div className={ss.footer}>
        <div className={`inline ${ss.footer__btn}`}>Подписаться</div>
        <div className={`inline ${ss.footer__btn}`}>
          <svg width="20" height="20">
            <use xlinkHref="../img/icons/icons.svg#share" />
          </svg>
          <p>Поделиться</p>
        </div>
      </div>
    </div>
  );
};
