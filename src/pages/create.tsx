import { MainLayout } from "@/layouts/MainLayout";
import { Api } from "@/utils/api";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

let Editor = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

interface PageProps {}

const Page: NextPage<PageProps> = ({}) => {
  const [titleValue, setTitleValue] = React.useState("");
  const [bodyValue, setBodyValue] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const refTextarea = React.useRef<HTMLTextAreaElement>(null);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const dto = {
        title: titleValue,
        body: bodyValue,
      };
      const question = await Api().question.create(dto);
      await router.push(`/questions/${question.id}`);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании вопроса");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (refTextarea.current) {
      refTextarea.current.style.height = "auto";
      refTextarea.current.style.height =
        refTextarea.current.scrollHeight + 3 + "px";
    }
  }, [titleValue]);

  return (
    <MainLayout>
      <div className="container">
        <div className="rightSide edit block create__wrapper">
          <div className="create">
            <h2 className="title">Задать вопрос</h2>

            <div className="inputBlock input__title">
              <textarea
                ref={refTextarea}
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                placeholder="Заголовок"
                maxLength={200}
                rows={1}
              />
              {titleValue.length <= 30 && (
                <div className="error">
                  Минимальный размер заголовка должен состовлять 30 символов
                </div>
              )}
              {titleValue.length >= 200 && (
                <div className="error">
                  Максимальная размер заголовка должен состовлять 350 символов
                </div>
              )}
            </div>

            <div className="inputBlock input__tags">
              <div className="inner">
                <ul className="tagList">
                  <li className="tag">
                    <a href="#">POSTGRES</a>
                  </li>
                  <li className="tag">
                    <a href="#">PYthon</a>
                  </li>
                </ul>
                <button className="add">+</button>
                <input type="text" />
              </div>
              {/* {titleValue.length >= 200 && (
                <div className="error">
                  Максимальная размер заголовка 350 символов
                </div>
              )} */}
            </div>

            <div className="editor inputBlock">
              <div className="inner">
                <Editor
                  initialValue={bodyValue}
                  onChange={(blocks) => setBodyValue(blocks)}
                />
              </div>
              {bodyValue.length <= 0 && (
                <div className="error">
                  Вы должны хоть что-то написать
                </div>
              )}
            </div>

            <button
              onClick={onSubmit}
              className={`btn submit ${
                isLoading || bodyValue.length <= 0 || titleValue.length <= 30
                  ? "disabled"
                  : ""
              }`}
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
