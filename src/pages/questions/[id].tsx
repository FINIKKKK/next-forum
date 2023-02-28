import React from "react";
import { GetServerSideProps, NextPage } from "next";

import { Answer, QuestionContent, Reply, SelectComponent } from "@/components";
import { ForumLayout } from "@/layouts/ForumLayout";
import { Api } from "@/utils/api";
import { TQuestion } from "@/utils/api/models/question/types";
import { TAnswer } from "@/utils/api/models/answer/types";
import { useSelectors } from "@/hooks/useSelectors";

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

  return (
    <ForumLayout>
      <div className="ques block rightSide">
        <QuestionContent question={question} />

        <div className="answers">
          <div className="answers__header">
            <h2 className="answers__title">Ответы</h2>
            <SelectComponent
              className="asnwers__select"
              value={option}
              options={options}
              setValue={setOption}
            />
          </div>
          {answers.map((obj: TAnswer) => (
            <Answer key={obj.id} {...obj} setAnswers={setAnswers} />
          ))}
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
    alert("Ошибка при получении вопроса");
    return {
      props: {},
    };
  }
};

export default QuestionPage;
