import { MainLayout } from "@/layouts/MainLayout";
import { Api } from "@/utils/api";
import { TTag } from "@/utils/api/types";
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
  const [tagsValue, setTagsValue] = React.useState("");
  const [tags, setTags] = React.useState<TTag[]>([]);
  const [selectedTags, setSelectedTags] = React.useState([]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const dto = {
        title: titleValue,
        body: bodyValue,
        tags: selectedTags
      };
      const question = await Api().question.create(dto);
      console.log(question);
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

  React.useEffect(() => {
    (async () => {
      if (tagsValue.length) {
        try {
          const tags = await Api().tag.search(tagsValue);
          console.log(tags);
          setTags(tags?.items);
        } catch (err) {
          console.warn(err);
          alert("Ошибка при получении меток");
        }
      }
    })();
  }, [tagsValue]);

  const onAddTag = (obj: TTag) => {
    setSelectedTags([...selectedTags, obj]);
  };

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
                  {selectedTags.map((obj: TTag) => (
                    <li key={obj.id} className="tag">
                      <a href="#">{obj.name}</a>
                    </li>
                  ))}
                </ul>
                <input
                  value={tagsValue}
                  onChange={(e) => setTagsValue(e.target.value)}
                  placeholder="Введите название метки"
                  type="text"
                />
              </div>
              {tags.length && (
                <div className="popup">
                  {tags
                    .filter((obj) => !selectedTags.includes(obj))
                    .map((obj: TTag) => (
                      <div
                        onClick={() => onAddTag(obj)}
                        key={obj.id}
                        className="tag__item"
                      >
                        <h5 className="name">{obj.name}</h5>
                        <p>{obj.description}</p>
                      </div>
                    ))}
                </div>
              )}
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
                <div className="error">Вы должны хоть что-то написать</div>
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
