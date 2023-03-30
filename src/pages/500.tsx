import { NextPage } from 'next';

import { Error404 } from '@/screens/Error404';

interface Error404PageProps {}

const Error404Page: NextPage<Error404PageProps> = ({}) => {
  return <Error404 title="500" text="Внутренняя ошибка сервера" />;
};

export default Error404Page;
