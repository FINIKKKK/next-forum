import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';

import { InputTags, InputTitle } from '@/components';
import { MainLayout } from '@/layouts/MainLayout';
import { Api } from '@/utils/api';
import { TQuestion } from '@/utils/api/models/question/types';
import { QuestionScheme } from '@/utils/validation';

let Editor = dynamic(() => import('@/components/blocks/Editor'), {
  ssr: false,
});

export type TError = {
  title: string;
  tags: string;
  body: string;
};

type CreateQuestionLayoutsProps = {
  questionData?: TQuestion;
};

export const CreateQuestionLayout: React.FC<CreateQuestionLayoutsProps> = ({
  questionData,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [title, setTitle] = React.useState(questionData?.title || '');
  const [body, setBody] = React.useState(questionData?.body || []);
  const [selectedTags, setSelectedTags] = React.useState(
    questionData?.tags || [],
  );
  const [errors, setErrors] = React.useState<TError | null>(null);
  const router = useRouter();
  const [isSubmit, setIsSubmit] = React.useState(false);

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
            const question = await Api().question.create(dto);
            await router.push(`/questions/${question.id}`);
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
      alert('Ошибка при создании вопроса');
    } finally {
      setIsSubmit(false);
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container">
        <div className="block create">
          <div className="inner">
            <h2 className="title">Задать вопрос</h2>

            <InputTitle
              value={title}
              setValue={setTitle}
              error={errors?.title}
            />

            <InputTags
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              error={errors?.tags}
            />

            <div className="editor inputBlock">
              <div className="inner">
                <Editor
                  initialValue={body}
                  onChange={(blocks: any) => setBody(blocks)}
                  placeholder="Введите текст"
                />
              </div>
              {errors?.body && <div className="error">{errors?.body}</div>}
            </div>

            <button
              onClick={onSubmit}
              className={`btn submit ${isLoading ? 'disabled' : ''}`}
            >
              {questionData ? 'Изменить' : 'Создать'}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
