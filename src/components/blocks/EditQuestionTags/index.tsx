import debounce from 'lodash.debounce';
import React from 'react';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Api } from '@/utils/api';
import { TTag } from '@/utils/api/models/tag/types';

import ss from './EditQuestionTags.module.scss';

interface EditQuestionTagsProps {
  selectedTags: TTag[];
  setSelectedTags: any;
  error?: string;
}

export const EditQuestionTags: React.FC<EditQuestionTagsProps> = ({
  selectedTags,
  setSelectedTags,
  error,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [tagsValue, setTagsValue] = React.useState('');
  const [tags, setTags] = React.useState<TTag[]>([]);
  const refTags = React.useRef<HTMLDivElement>(null);

  const filteredTags = tags.filter(
    (obj) => !selectedTags.some((obj2) => obj2.id === obj.id),
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsValue(e.target.value);
    searchTags(e.target.value);
  };

  const searchTags = React.useCallback(
    debounce((value: string) => {
      (async () => {
        try {
          let dto = {
            page: 1,
            limit: 3,
            search: value,
          };
          if (value !== '') {
            const tags = await Api().tag.getAll(dto);
            setTags(tags?.items);
          }
        } catch (err) {
          console.warn(err);
          alert('Ошибка при получении меток');
        }
      })();
    }, 150),
    [],
  );

  const onAddTag = (obj: TTag) => {
    setSelectedTags([...selectedTags, obj]);
    setTagsValue('');
  };

  const onRemoveTag = (obj: TTag) => {
    setSelectedTags(selectedTags.filter((item: TTag) => item.id !== obj.id));
  };

  useOutsideClick(refTags, setIsVisible);

  return (
    <div
      ref={refTags}
      onClick={() => setIsVisible(true)}
      className={`inputBlock ${ss.tags}`}
    >
      <div className={ss.input}>
        {selectedTags.length > 0 && (
          <ul className={ss.list}>
            {selectedTags.map((obj) => (
              <li
                key={obj.id}
                className={`hover ${ss.item}`}
                onClick={() => onRemoveTag(obj)}
              >
                <p>{obj.name}</p>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 210 210"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M204.539 5.3203C197.445 -1.77343 185.946 -1.77343 178.851 5.3203L104.93 79.2417L31.0083 5.3203C23.9146 -1.77343 12.415 -1.77343 5.3203 5.3203C-1.77343 12.414 -1.77343 23.9136 5.3203 31.0083L79.2417 104.93L5.3203 178.851C-1.77343 185.945 -1.77343 197.444 5.3203 204.539C8.8307 208.049 13.5339 209.841 18.164 209.841C22.7943 209.841 27.4244 208.049 31.0078 204.539L104.929 130.618L178.85 204.539C182.361 208.049 187.064 209.841 191.694 209.841C196.324 209.841 200.955 208.049 204.538 204.539C211.632 197.445 211.632 185.946 204.538 178.851L130.617 104.93L204.538 31.0083C211.632 23.9094 211.633 12.415 204.539 5.3203Z"
                    fill="#1f1a30"
                  />
                </svg>
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
          />
        )}
      </div>
      {isVisible && tagsValue && (
        <div className={ss.popup}>
          {filteredTags.length > 0 ? (
            filteredTags.map((obj: TTag) => (
              <div className={ss.wrapper}>
                <div
                  onClick={() => onAddTag(obj)}
                  key={obj.id}
                  className={ss.tag}
                >
                  <h5>{obj.name}</h5>
                  <p>{obj.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className={ss.warning}>
              По вашему запросу ничего не найдено
            </div>
          )}
        </div>
      )}
      {error && <div className="error">{error}</div>}
      {selectedTags.length === 5 && (
        <div className="error">Вопрос должен иметь максимум 5 меток</div>
      )}
    </div>
  );
};
