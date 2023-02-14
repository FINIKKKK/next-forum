import { MainLayout } from "@/layouts/MainLayout";
import { Api } from "@/utils/api";
import { TTag } from "@/utils/api/types";
import { QuestionScheme } from "@/utils/validation";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import debounce from "lodash.debounce";

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
  const [errorMessages, setErrorMessages] = React.useState([]);
  const [isFocus, setIsFocus] = React.useState(false);

  const updateSearchValue = React.useCallback(
    debounce((value: string) => {
      (async () => {
        try {
          let dto = {
            name: value,
            limit: 3,
          };
          if (value !== "") {
            const tags = await Api().tag.search(dto);
            setTags(tags?.items);
          }
        } catch (err) {
          console.warn(err);
          alert("Ошибка при получении меток");
        }
      })();
    }, 250),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onSubmit = async () => {
    try {
      QuestionScheme.validate(
        { title: titleValue, tags: selectedTags, body: bodyValue },
        { abortEarly: false }
      )
        .then(() => {
          (async () => {
            setIsLoading(true);
            const dto = {
              title: titleValue,
              body: bodyValue,
              tags: selectedTags,
            };
            const question = await Api().question.create(dto);
            await router.push(`/questions/${question.id}`);
          })();
        })
        .catch((errors) => {
          const errorData = errors.inner.reduce((acc, curr) => {
            acc[curr.path] = curr.message;
            return acc;
          }, {});
          setErrorMessages(errorData);
        });
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

  // React.useEffect(() => {
  //   (async () => {
  //     if (tagsValue.length) {
  //       try {
  //         const tags = await Api().tag.search(tagsValue);
  //         console.log(tags);
  //         setTags(tags?.items);
  //       } catch (err) {
  //         console.warn(err);
  //         alert("Ошибка при получении меток");
  //       }
  //     }
  //   })();
  // }, [tagsValue]);

  const onAddTag = (obj: TTag) => {
    setSelectedTags([...selectedTags, obj]);
    setTagsValue("");
  };

  const onRemoveTag = (obj: TTag) => {
    setSelectedTags(selectedTags.filter((item) => item.id !== obj.id));
  };

  const handleKeyPress = (e: any) => {
    console.log(e.key);
    if (e.key === "Enter") {
      e.preventDefault();
    }
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
                onKeyPress={handleKeyPress}
              />
              {errorMessages.title && (
                <div className="error">{errorMessages.title}</div>
              )}
            </div>

            <div className="inputBlock input__tags">
              <div className="inner">
                {selectedTags.length > 0 && (
                  <ul className="tagList">
                    {selectedTags.map((obj: TTag) => (
                      <li
                        key={obj.id}
                        className="tag"
                        onClick={() => onRemoveTag(obj)}
                      >
                        <p>{obj.name}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {selectedTags.length < 5 && (
                  <input
                    value={tagsValue}
                    onChange={onChangeInput}
                    placeholder="Метки"
                    type="text"
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                  />
                )}
              </div>
              {isFocus && tagsValue && (
                <div className="popup">
                  {tags.length > 0 ? (
                    tags
                      .filter(
                        (obj) =>
                          !selectedTags.some((obj2) => obj2.id === obj.id)
                      )
                      .map((obj: TTag) => (
                        <div className="tag__item-wrapper">
                          <div
                            onClick={() => onAddTag(obj)}
                            key={obj.id}
                            className="tag__item"
                          >
                            <h5 className="name">{obj.name}</h5>
                            <p>{obj.description}</p>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="warning">
                      По вашему запросу ничего не найдено
                    </div>
                  )}
                </div>
              )}
              {errorMessages.tags && (
                <div className="error">{errorMessages.tags}</div>
              )}
              {selectedTags.length === 5 && (
                <div className="error">
                  Вопрос должен иметь максимум 5 меток
                </div>
              )}
            </div>

            <div className="editor inputBlock">
              <div className="inner">
                <Editor
                  initialValue={bodyValue}
                  onChange={(blocks) => setBodyValue(blocks)}
                />
              </div>
              {errorMessages.body && (
                <div className="error">{errorMessages.body}</div>
              )}
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
