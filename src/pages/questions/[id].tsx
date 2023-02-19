import React from "react";
import { GetServerSideProps, NextPage } from "next";

import { Answer, QuestionContent, Reply } from "@/components";
import { ForumLayout } from "@/layouts/ForumLayout";
import { Api } from "@/utils/api";
import { TQuestion } from "@/utils/api/models/question/types";
import { TAnswer } from "@/utils/api/models/answer/types";

interface QuestionPageProps {
  question: TQuestion;
  answers: TAnswer[];
}

const QuestionPage: NextPage<QuestionPageProps> = ({
  question,
  answers: answerList,
}) => {
  const [answers, setAnswers] = React.useState<TAnswer[]>(answerList || []);

  return (
    <ForumLayout>
      <div className="ques block rightSide">
        <QuestionContent question={question} />

        <div className="answers">
          <h2 className="answers__title">Ответы</h2>
          {answers.map((obj: TAnswer) => (
            <Answer key={obj.id} {...obj} />
          ))}

          <Reply
            questionId={question.id}
            setAnswers={setAnswers}
          />
        </div>
      </div>
    </ForumLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx?.params?.id;
    const question = await Api().question.getOne(id);
    const answers = await Api().answer.getAll({ questionId: question.id });
    return {
      props: {
        question,
        answers,
      },
    };
  } catch (err) {
    console.warn(err);
    alert("Ошибка при получении вопроса");
    return {
      props: {},
    };
  }
};

export default QuestionPage;
