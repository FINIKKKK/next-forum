import { NextPage } from 'next';

import { MetaLayout } from '@/layouts/MetaLayout';
import { Error404 } from '@/screens/Error404';

interface Error404PageProps {}

const Error404Page: NextPage<Error404PageProps> = ({}) => {
  return (
    <MetaLayout title="Ошибка сервера">
      <Error404 title="500" text="Внутренняя ошибка сервера" />
    </MetaLayout>
  );
};

export default Error404Page;
