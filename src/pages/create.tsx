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

  return (
    <MainLayout>
      <div className="container">
        <div className="rightSide edit block create__wrapper">
          <div className="create">
            <h2 className="title">Задать вопрос</h2>

            <div className="inputBlock input__title">
              <input
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                type="text"
                placeholder="Заголовок"
              />
            </div>

            <div className="inputBlock input__tags">
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

            <Editor
              initialValue={bodyValue}
              onChange={(blocks) => setBodyValue(blocks)}
            />

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
