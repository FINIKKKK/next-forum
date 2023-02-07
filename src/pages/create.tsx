import { ForumLayout } from "@/layouts/ForumLayout";
import { NextPage } from "next";

interface PageProps {}

const Page: NextPage<PageProps> = ({}) => {
  return (
    <ForumLayout>
      <div className="rightSide edit block">
        <div className="inputBlock input__title">
          <input type="text" placeholder="Заголовок" />
        </div>

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

        <button className="btn submit">Задать вопрос</button>
      </div>
    </ForumLayout>
  );
};

export default Page;
