import React from "react";
import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { MainLayout } from "@/layouts/MainLayout";
import { Api } from "@/utils/api";
import { QuestionScheme } from "@/utils/validation";
import { InputTags, InputTitle } from "@/components/CreatePage";
import { TQuestion } from "@/utils/api/models/question/types";

let Editor = dynamic(() => import("../../components/Editor"), {
  ssr: false,
});

interface EditQuestionPageProps {
  question?: TQuestion;
}

export type TError = {
  title: string;
  tags: string;
  body: string;
};

const EditQuestionPage: NextPage<EditQuestionPageProps> = ({ question }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [title, setTitle] = React.useState(question?.title || "");
  const [body, setBody] = React.useState(question?.body || []);
  const [selectedTags, setSelectedTags] = React.useState(question?.tags || []);
  const [errors, setErrors] = React.useState<TError | null>(null);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      QuestionScheme.validate(
        { title: title, tags: selectedTags, body: body },
        { abortEarly: false }
      )
        .then(() => {
          (async () => {
            setIsLoading(true);
            const dto = {
              title: title,
              body: body,
              tags: selectedTags,
            };
            if (question?.id) {
              await Api().question.update(question?.id, dto);
              await router.push(`/questions/${question?.id}`);
            }
          })();
        })
        .catch((errors) => {
          const errorData = errors.inner.reduce((sum: any, obj: any) => {
            sum[obj.path] = obj.message;
            return sum;
          }, {});
          setErrors(errorData);
        });
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании вопроса");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container">
        <div className="rightSide edit block create__wrapper">
          <div className="create">
            <h2 className="title">Задать вопрос</h2>

            <InputTitle
              value={title}
              setValue={setTitle}
              error={errors?.title}
            />

            <InputTags
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              error={errors?.tags}
            />

            <div className="editor inputBlock">
              <div className="inner">
                <Editor
                  initialValue={body}
                  onChange={(blocks: any) => setBody(blocks)}
                />
              </div>
              {errors?.body && <div className="error">{errors?.body}</div>}
            </div>

            <button
              onClick={onSubmit}
              className={`btn submit ${isLoading ? "disabled" : ""}`}
            >
              Изменить
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx?.params?.id;
    const question = await Api().question.getOne(id);
    return {
      props: {
        question,
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

export default EditQuestionPage;
