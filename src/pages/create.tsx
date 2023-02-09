import { ForumLayout } from "@/layouts/ForumLayout";
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
    <ForumLayout>
      <div className="rightSide edit block">
        <div className="inputBlock input__title">
          <input
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            type="text"
            placeholder="Заголовок"
          />
        </div>
        {/* 
        <div className="inputBlock input__text">
          <div className="buttons">
            <svg className="item" width="20" height="20">
              <use xlinkHref="./img/icons/icons.svg#b" />
            </svg>
            <svg className="item" width="20" height="20">
              <use xlinkHref="./img/icons/icons.svg#i" />
            </svg>
            <svg className="item" width="20" height="20">
              <use xlinkHref="./img/icons/icons.svg#code" />
            </svg>
            <svg className="item" width="20" height="20">
              <use xlinkHref="./img/icons/icons.svg#list" />
            </svg>
            <svg className="item" width="20" height="20">
              <use xlinkHref="./img/icons/icons.svg#image" />
            </svg>
            <svg className="item" width="20" height="20">
              <use xlinkHref="./img/icons/icons.svg#link" />
            </svg>
          </div>
          <textarea></textarea>
        </div> */}

        <Editor
          initialValue={bodyValue}
          onChange={(blocks) => setBodyValue(blocks)}
        />

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

        <button
          onClick={onSubmit}
          className={`btn submit ${isLoading ? "disabled" : ""}`}
        >
          Задать вопрос
        </button>
      </div>
    </ForumLayout>
  );
};

export default Page;
