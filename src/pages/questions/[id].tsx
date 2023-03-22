import {
  Answer,
  NotFound,
  QuestionContent,
  Reply,
  SelectComponent,
} from "@/components";
import { useSelectors } from "@/hooks/useSelectors";
import { ForumLayout } from "@/layouts/ForumLayout";
import { Api } from "@/utils/api";
import { TAnswer } from "@/utils/api/models/answer/types";
import { TQuestion } from "@/utils/api/models/question/types";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

interface QuestionPageProps {
  question: TQuestion;
  answers: TAnswer[];
}

const options = [
  {
    value: "rating",
    label: "По рейтингу",
  },
  {
    value: "date",
    label: "По дате",
  },
];

const QuestionPage: NextPage<QuestionPageProps> = ({
  question,
  answers: answerList,
}) => {
  const [answers, setAnswers] = React.useState<TAnswer[]>(answerList || []);
  const [option, setOption] = React.useState(options[0]);
  const { data: userData } = useSelectors((state) => state.user);
  const [isAnswer, setIsAnswer] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (option.value === "rating") {
      answers.sort((a, b) => a.rating - b.rating);
    } else if (option.value === "date") {
      answers.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
  }, [option]);

  const setAnswer = (id: number) => {
   setIsAnswer(id)
  }

  return (
    <ForumLayout>
      <div className="ques block rightSide">
        <QuestionContent question={question} />

        <div className="answers">
          <div className="answers__header">
            <h2 className="answers__title">Ответы</h2>
            {answers.length !== 0 && (
              <SelectComponent
                className="asnwers__select"
                value={option}
                options={options}
                setValue={setOption}
              />
            )}
          </div>
          {userData?.id === question.user.id && answers.length === 0 ? (
            <NotFound label="На данный вопрос пока никто не ответил :(" />
          ) : (
            answers.map((obj: TAnswer) => (
              <Answer setAnswer={setAnswer} answerId={isAnswer} key={obj.id} {...obj} setAnswers={setAnswers} />
            ))
          )}
          {userData && userData.id !== question.user.id && (
            <Reply questionId={question.id} setAnswers={setAnswers} />
          )}
          {!userData && (
            <div className="noreply">
              <h3>
                Войдите в аккаунт или зарегистрируйтесь, чтобы ответить на
                вопрос
              </h3>
            </div>
          )}
        </div>
      </div>
    </ForumLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx?.params?.id;
    if (id) {
      const question = await Api().question.getOne(+id);
      const answers = await Api().answer.getAll({ questionId: question.id });
      return {
        props: {
          question,
          answers,
        },
      };
    } else {
      return {
        props: {},
      };
    }
  } catch (err) {
    console.warn(err);
    return {
      props: {},
    };
  }
};

export default QuestionPage;
