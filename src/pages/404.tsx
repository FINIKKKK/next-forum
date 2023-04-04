import { NextPage } from 'next';

import { MetaLayout } from '@/layouts/MetaLayout';
import { Error404 } from '@/screens/Error404';

interface Error404PageProps {}

const Error404Page: NextPage<Error404PageProps> = ({}) => {
  return (
    <MetaLayout title="Страница не найдена" noIndex>
      <Error404 title="404" text="Страница не найдена" />
    </MetaLayout>
  );
};

export default Error404Page;
