import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { MainLayout } from "@/layouts/MainLayout";
import { Api } from "@/utils/api";
import { QuestionScheme } from "@/utils/validation";
import { InputTags, InputTitle } from "@/components/CreatePage";

let Editor = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

interface PageProps {}

export type TError = {
  title: string;
  tags: string;
  body: string;
};

const Page: NextPage<PageProps> = ({}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
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
            const question = await Api().question.create(dto);
            await router.push(`/questions/${question.id}`);
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
              Создать
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Page;
