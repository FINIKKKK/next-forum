import { OutputBlockData } from "@editorjs/editorjs";
import React from "react";

import ss from "./QuestionBody.module.scss";

interface QuestionBodyProps {
  value: OutputBlockData[];
}

export const QuestionBody: React.FC<QuestionBodyProps> = ({ value }) => {
  return (
    <div className={ss.body}>
      {value.map((obj) =>
        obj.type === "paragraph" ? (
          <p
            className={`${ss.text} ${ss.el}`}
            dangerouslySetInnerHTML={{
              __html: obj.data.text,
            }}
          />
        ) : obj.type === "list" ? (
          <ul
          // className={classNames({`${ss.list} ${ss.el}`}, {
          //   ordered: obj.data.style === {ss.ordered},
          // })}
          >
            {obj.data.items.map((item: string) => (
              <li>{item}</li>
            ))}
          </ul>
        ) : obj.type === "delimiter" ? (
          <div className={`${ss.delimiter} ${ss.el}`}>***</div>
        ) : obj.type === "header" ? (
          obj.data.level === 6 ? (
            <h6 className={ss.title}>{obj.data.text}</h6>
          ) : obj.data.level === 5 ? (
            <h5 className={ss.title}>{obj.data.text}</h5>
          ) : obj.data.level === 4 ? (
            <h4 className={ss.title}>{obj.data.text}</h4>
          ) : obj.data.level === 3 ? (
            <h3 className={ss.title}>{obj.data.text}</h3>
          ) : obj.data.level === 2 ? (
            <h2 className={ss.title}>{obj.data.text}</h2>
          ) : obj.data.level === 1 ? (
            <h1 className={ss.title}>{obj.data.text}</h1>
          ) : null
        ) : obj.type === "codeBox" ? (
          <div className={`${ss.code} ${ss.el}`}>
            <div className={ss.code__lg}>{obj.data.language}</div>
            <code
              dangerouslySetInnerHTML={{
                __html: obj.data.code,
              }}
            />
          </div>
        ) : obj.type === "quote" ? (
          <div className={`${ss.quote} ${ss.el}`}>
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#answers" />
            </svg>
            <div className={ss.quote__content}>
              <h3>{obj.data.text}</h3>
              <p>{obj.data.caption}</p>
            </div>
          </div>
        ) : obj.type === "image" ? (
          <div className={`${ss.img} ${ss.el}`}>
            <img src={obj.data.file.url} alt="img" />
          </div>
        ) : null
      )}
    </div>
  );
};
