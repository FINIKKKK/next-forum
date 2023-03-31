import { OutputBlockData } from '@editorjs/editorjs';
import classNames from 'classnames';
import React from 'react';

import ss from './QuestionBody.module.scss';

interface QuestionBodyProps {
  body: OutputBlockData[];
}

export const QuestionBody: React.FC<QuestionBodyProps> = ({ body }) => {
  return (
    <div className={ss.body}>
      {body.map((obj) =>
        obj.type === 'paragraph' ? (
          <p
            key={obj.id}
            className={`${ss.text} ${ss.el}`}
            dangerouslySetInnerHTML={{
              __html: obj.data.text,
            }}
          />
        ) : obj.type === 'list' ? (
          <ul
            key={obj.id}
            className={classNames(ss.list, ss.el, {
              [ss.ordered]: obj.data.style === 'ordered',
            })}
          >
            {obj.data.items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : obj.type === 'delimiter' ? (
          <div key={obj.id} className={`${ss.delimiter} ${ss.el}`}>
            ***
          </div>
        ) : obj.type === 'header' ? (
          obj.data.level === 6 ? (
            <h6 key={obj.id} className={ss.title}>
              {obj.data.text}
            </h6>
          ) : obj.data.level === 5 ? (
            <h5 key={obj.id} className={ss.title}>
              {obj.data.text}
            </h5>
          ) : obj.data.level === 4 ? (
            <h4 key={obj.id} className={ss.title}>
              {obj.data.text}
            </h4>
          ) : obj.data.level === 3 ? (
            <h3 key={obj.id} className={ss.title}>
              {obj.data.text}
            </h3>
          ) : obj.data.level === 2 ? (
            <h2 key={obj.id} className={ss.title}>
              {obj.data.text}
            </h2>
          ) : obj.data.level === 1 ? (
            <h1 key={obj.id} className={ss.title}>
              {obj.data.text}
            </h1>
          ) : null
        ) : obj.type === 'codeBox' ? (
          <div key={obj.id} className={classNames('block2', ss.code, ss.el)}>
            <div className={ss.code__lg}>
              {obj.data.language !== 'Auto-detect' ? obj.data.language : ' '}
            </div>
            <code
              dangerouslySetInnerHTML={{
                __html: obj.data.code,
              }}
            />
          </div>
        ) : obj.type === 'quote' ? (
          <div key={obj.id} className={`block2 ${ss.quote} ${ss.el}`}>
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#quote" />
            </svg>
            <div className={ss.quote__content}>
              <h3>{obj.data.text}</h3>
              <p>{obj.data.caption}</p>
            </div>
          </div>
        ) : obj.type === 'image' ? (
          <div key={obj.id} className={`${ss.img} ${ss.el}`}>
            <img src={obj.data.file.url} alt="img" />
          </div>
        ) : null,
      )}
    </div>
  );
};
