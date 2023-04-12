import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import {
  EditQuestionTags,
  EditQuestionTitle,
  SelectComponent,
  Warning,
} from '@/components';
import { useErrorMessage } from '@/hooks/useErrorMessage';
import { MainLayout } from '@/layouts/MainLayout';
import { Api } from '@/utils/api';
import { TCategory } from '@/utils/api/models/category/types';
import { TQuestion } from '@/utils/api/models/question/types';
import { QuestionScheme } from '@/utils/validation';

import ss from './CreateQuestion.module.scss';

let Editor = dynamic(() => import('@/components/blocks/Editor'), {
  ssr: false,
});

export type TError = {
  title: string;
  tags: string;
  body: string;
};

interface CreateQuestionProps {
  label: string;
  type?: string;
  questionData?: TQuestion;
  categories?: TCategory[];
}

export const CreateQuestion: React.FC<CreateQuestionProps> = ({
  label,
  type,
  questionData,
  categories,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [title, setTitle] = React.useState(questionData?.title || '');
  const [body, setBody] = React.useState(questionData?.body || []);
  const [selectedTags, setSelectedTags] = React.useState(
    questionData?.tags || [],
  );
  const [category, setCategory] = React.useState(
    categories ? categories[0].value : null,
  );
  const [image, setImage] = React.useState('');
  const [errors, setErrors] = React.useState<TError | null>(null);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    const handleRouteChange = (url: any) => {
      if (!isSubmit) {
        if (
          (title || !!body.length || !!selectedTags.length) &&
          !window.confirm(
            'Вы действительно хотите уйти со страницы? Все несохраненные данные будут потеряны.',
          )
        ) {
          router.events.emit('routeChangeError');
          throw 'routeChange aborted.';
        }
      }
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [title, body, selectedTags, router.events, isSubmit]);

  const onSubmit = async () => {
    try {
      QuestionScheme.validate(
        { title: title, tags: selectedTags, body: body },
        { abortEarly: false },
      )
        .then(() => {
          (async () => {
            setIsLoading(true);
            setIsSubmit(true);
            const dto = {
              title: title,
              body: body,
              tags: selectedTags,
            };
            if (questionData) {
              const question = await Api().question.update(
                questionData.id,
                dto,
              );
              await router.push(`/questions/${question.id}`);
            } else {
              const question = await Api().question.create(dto);
              await router.push(`/questions/${question.id}`);
            }
          })();
        })
        .catch((errors) => {
          const errorData = errors.inner.reduce((sum: any, obj: any) => {
            sum[obj.path] = obj.message;
            return sum;
          }, {});
          setErrors(errorData);
        });
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании');
    } finally {
      setIsSubmit(false);
      setIsLoading(false);
    }
  };

  const onUploadFile = async (e: any) => {
    if (e.target.files) {
      try {
        const fileURL = await Api().files.upload(e.target.files[0], 'posts');
        setImage(fileURL);
      } catch (err) {
        setErrorMessage(err?.response?.data?.message);
      }
    }
  };
  useErrorMessage(errorMessage, setErrorMessage, 5000);

  return (
    <MainLayout>
      <div className="container">
        <div className={`block ${ss.create}`}>
          <div className={ss.inner}>
            <h2 className={ss.title}>{label}</h2>

            {type === 'post' && (
              <div className={`block ${ss.image}`}>
                <input type="file" onChange={onUploadFile} />
                {image && (
                  <Image src={image} alt="image" width={850} height={550} />
                )}
                <div className={ss.content}>
                  <svg
                    width="86"
                    height="82"
                    viewBox="0 0 86 82"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M84.3658 1.63815C83.3218 0.587957 81.9026 -0.00233176 80.4234 6.92287e-06H5.57662C4.0974 -0.000773838 2.67814 0.588735 1.63258 1.63736C0.586236 2.68677 -0.000776515 4.10937 7.72295e-07 5.59294V76.4071C-0.000777711 77.8906 0.587013 79.3132 1.63258 80.3626C2.67893 81.4113 4.09738 82.0008 5.57662 82H80.4234C81.9018 82 83.3203 81.4113 84.3666 80.3619C85.4122 79.3132 86 77.8907 86 76.4071V5.59296C86.0016 4.10941 85.4137 2.68596 84.3658 1.63815ZM28.4729 17.9024C30.8287 17.9032 33.088 18.8417 34.7542 20.5127C36.4195 22.1837 37.3553 24.4495 37.3553 26.8132C37.3545 29.1758 36.4187 31.4418 34.7526 33.112C33.0865 34.783 30.8273 35.7216 28.4713 35.7208C26.1147 35.7208 23.8554 34.7822 22.19 33.1112C20.524 31.4403 19.5881 29.1744 19.5889 26.8116C19.5889 24.4481 20.5247 22.1822 22.1908 20.5111C23.8569 18.841 26.1169 17.9024 28.4729 17.9024ZM73.2207 62.6512C72.8533 63.5116 72.0078 64.0684 71.0742 64.0652L14.9282 64.0941C14.0422 64.0957 13.2318 63.5952 12.8339 62.8011C12.4361 62.0078 12.5194 61.0568 13.0488 60.3447L23.0863 46.8117C23.4927 46.2643 24.1156 45.9216 24.7936 45.8716C25.4717 45.8224 26.1382 46.0707 26.6193 46.5525L31.1457 51.0921C31.6237 51.5731 32.2871 51.8214 32.962 51.7745C33.6378 51.7277 34.2599 51.3896 34.6678 50.8469L51.6009 28.3476C52.0789 27.7128 52.8442 27.3646 53.6352 27.4208C54.4254 27.477 55.1339 27.9314 55.5177 28.6272L73.1211 60.5852V60.5859C73.4753 61.22 73.5127 61.9852 73.2207 62.6512Z"
                      fill="#74707F"
                    />
                  </svg>
                  <p>Выберите изображение</p>
                </div>
              </div>
            )}

            <EditQuestionTitle
              value={title}
              setValue={setTitle}
              error={errors?.title}
            />

            {type === 'post' && categories ? (
              <>
                <div className={ss.extra}>
                  <SelectComponent
                    options={categories}
                    value={category}
                    setValue={setCategory}
                    placeholder="Выберите категорию"
                    className={ss.select}
                  />
                  <EditQuestionTags
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    error={errors?.tags}
                    className={ss.tags}
                  />
                </div>
                <Warning message={errorMessage} isActive={!!errorMessage} />
              </>
            ) : (
              <EditQuestionTags
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                error={errors?.tags}
              />
            )}

            <div className="editor inputBlock">
              <div className="inner">
                <Editor
                  initialValue={body}
                  onChange={(blocks: any) => setBody(blocks)}
                  placeholder="Введите текст"
                  type="question"
                />
              </div>
              {errors?.body && <div className="error">{errors?.body}</div>}
            </div>

            <button
              onClick={onSubmit}
              className={`btn ${ss.btn} ${isLoading ? 'disabled' : ''}`}
            >
              {questionData ? 'Изменить' : 'Создать'}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
