import { CreateQuestionLayout } from "@/layouts/CreateQuestionLayout";
import { Api } from "@/utils/api";
import { TQuestion } from "@/utils/api/models/question/types";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

interface EditQuestionPageProps {
  question: TQuestion;
}

const EditQuestionPage: NextPage<EditQuestionPageProps> = ({ question }) => {
  return <CreateQuestionLayout questionData={question} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx?.params?.id;
    if (id) {
      const question = await Api().question.getOne(+id);
      return {
        props: {
          question,
        },
      };
    }
    return {
      props: {},
    };
  } catch (err) {
    console.warn(err);
    alert("Ошибка при получении вопроса");
    return {
      props: {},
    };
  }
};

export default EditQuestionPage;
