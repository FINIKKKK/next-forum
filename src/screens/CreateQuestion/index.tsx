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
import { PostScheme, QuestionScheme } from '@/utils/validation';

import ss from './CreateQuestion.module.scss';

let Editor = dynamic(() => import('@/components/blocks/Editor'), {
  ssr: false,
});

export type TError = {
  title: string;
  tags: string;
  body: string;
  image?: string;
  category?: string;
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
  const [category, setCategory] = React.useState<TCategory | null>(null);
  const [image, setImage] = React.useState('');
  const [errors, setErrors] = React.useState<TError | null>(null);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

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
      if (type === 'post') {
        PostScheme.validate(
          { title, tags: selectedTags, body, category, image },
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
                categoryId: category?.id,
                image,
              };
              const post = await Api().post.create(dto);
              await router.push(`/posts/${post.slug}`);
            })();
          })
          .catch((errors) => {
            const errorData = errors.inner.reduce((sum: any, obj: any) => {
              sum[obj.path] = obj.message;
              return sum;
            }, {});
            console.log(errorData);
            setErrors(errorData);
          });
      } else {
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
      }
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

            <EditQuestionTitle
              value={title}
              setValue={setTitle}
              error={errors?.title}
            />

            {type === 'post' && (
              <div className={`${ss.image__wrapper}`}>
                <div className={`block ${ss.image}`}>
                  <input type="file" onChange={onUploadFile} />
                  {image && (
                    <Image src={image} alt="image" width={1450} height={950} />
                  )}
                  <div className={ss.content}>
                    <svg
                      width="672"
                      height="672"
                      viewBox="0 0 672 672"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M209.067 126.931C254.427 126.931 291.197 165.379 291.197 212.8C291.197 260.216 254.427 298.664 209.067 298.664C163.707 298.664 126.931 260.216 126.931 212.8C126.931 165.379 163.707 126.931 209.067 126.931ZM209.067 255.733C231.744 255.733 250.135 236.509 250.135 212.801C250.135 189.088 231.744 169.864 209.067 169.864C186.384 169.864 167.999 189.088 167.999 212.801C167.999 236.509 186.384 255.733 209.067 255.733ZM630 0C653.213 0 672 18.7867 672 42V630C672 653.213 653.213 672 630 672H42C18.7867 672 0 653.213 0 630V42C0 18.7867 18.7867 0 42 0H630ZM42 609C42 614.828 44.3645 620.078 48.1927 623.891C44.3853 620.078 42 614.828 42 609ZM630 609V545.959L476.907 392.865C468.704 384.662 455.412 384.662 447.209 392.865C447.209 392.865 346.084 493.991 323.751 516.344C301.417 538.656 286.371 538.328 264.365 516.344C242.355 494.313 224.907 476.865 224.907 476.865C216.704 468.662 203.412 468.662 195.209 476.865L48.1827 623.892C51.9744 627.658 57.2035 630.001 62.9893 630.001H608.989C620.593 630.001 629.989 620.605 629.989 609.001L630 609ZM630 486.568V62.9947C630 51.3905 620.604 41.9947 609 41.9947H63C51.3959 41.9947 42 51.3905 42 62.9947V570.688L180.373 432.341C196.775 415.899 223.357 415.899 239.759 432.341L294.065 486.628L432.372 348.348C448.773 331.905 475.356 331.905 491.757 348.348L630 486.568Z"
                        fill="#EAE7F4"
                      />
                    </svg>
                    <p>Выберите изображение</p>
                  </div>
                </div>
                {errors?.image && <div className="error">{errors?.image}</div>}
              </div>
            )}

            {type === 'post' && categories ? (
              <>
                <div className={ss.extra}>
                  <div className={ss.select__wrapper}>
                    <SelectComponent
                      options={categories}
                      value={category}
                      setValue={setCategory}
                      placeholder="Выберите категорию"
                      className={ss.select}
                    />
                    {errors?.category && (
                      <div className="error">{errors?.category}</div>
                    )}
                  </div>
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
                  type="post"
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
