import debounce from 'lodash.debounce';
import React from 'react';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Api } from '@/utils/api';
import { TTag, TTags } from '@/utils/api/models/tag/types';

import ss from './InputTags.module.scss';

interface InputTagsProps {
  selectedTags: TTag[];
  setSelectedTags: any;
  error?: string;
}

export const InputTags: React.FC<InputTagsProps> = ({
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
                className={ss.item}
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
