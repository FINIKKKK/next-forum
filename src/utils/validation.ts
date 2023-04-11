import * as yup from 'yup';

export const RegisterScheme = yup.object().shape({
  login: yup
    .string()
    .min(3, 'Логин должен состоять минимум из 3 символов')
    .required('Поле является обязательным'),
  email: yup
    .string()
    .email('Некорректный email')
    .required('Поле является обязательным'),
  password: yup
    .string()
    .min(9, 'Пароль должен состоять минимум из 9 символов')
    .required('Поле является обязательным'),
});

export const QuestionScheme = yup.object().shape({
  title: yup
    .string()
    .min(20, 'Заголовок должен состоять минимум из 20 символов')
    .max(200, 'Заголовок должен состоять максимум из 200 символов'),
  tags: yup
    .array()
    .min(1, 'Вопрос должен иметь минимум 1 метку')
    .max(6, 'Вопрос должен иметь максимум 6 меток'),
  body: yup.array().min(1, 'Вы должны хоть что-то написать'),
});

export const AnswerScheme = yup.object().shape({
  body: yup.array().min(1, 'Вы должны хоть что-то написать'),
});

export const UpdateUserDataScheme = yup.object().shape({
  login: yup
    .string()
    .min(3, 'Логин должен состоять минимум из 3 символов')
    .required('Поле является обязательным'),
  email: yup
    .string()
    .email('Некорректный email')
    .required('Поле является обязательным'),
});

export const UpdateUserPasswordScheme = yup.object().shape({
  old_password: yup.string().required('Поле является обязательным'),
  password1: yup
    .string()
    .min(9, 'Пароль должен состоять минимум из 9 символов')
    .required('Поле является обязательным'),
  password2: yup
    .string()
    .oneOf([yup.ref('password1')], 'Пароли должны совпадать')
    .required('Поле является обязательным'),
});
