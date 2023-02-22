import React from "react";

import { Popup, QuestionBody, UserBox } from "@/components";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useSelectors } from "@/hooks/useSelectors";
import { useTimeNow } from "@/hooks/useTimeNow";
import { TQuestion } from "@/utils/api/models/question/types";

import ss from "./QuestionContent.module.scss";
import { Api } from "@/utils/api";
import { useRouter } from "next/router";

interface QuestionContentProps {
  question: TQuestion;
}

export const QuestionContent: React.FC<QuestionContentProps> = ({
  question,
}) => {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const router = useRouter();

  const onRemoveQuestion = async () => {
    if (window.confirm("Вы действительно хотите удалить вопрос")) {
      try {
        await Api().question.remove(question.id);
        await router.push("/");
      } catch (err) {
        console.warn(err);
        alert("Ошибка при удалении вопроса");
      }
    } else {
      setVisiblePopup(false);
    }
  };

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
          <p>{question.answerCount}</p>
        </div>
        <div className={`${ss.header__item} ${ss.favorite}`}>
          <svg width="20" height="20">
            <use xlinkHref="../img/icons/icons.svg#favorite2" />
          </svg>
          <p>0</p>
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

      <h1 className={ss.title}>{question.title}</h1>

      <ul className={ss.tagList}>
        {question.tags.map((obj) => (
          <li key={obj.id} className={`tag hover ${ss.tag}`}>
            <a href={`/?tagby${obj.name}`}>{obj.name}</a>
          </li>
        ))}
      </ul>

      <UserBox user={question.user} className={ss.user} />

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
