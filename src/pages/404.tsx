import { NextPage } from 'next';
import Link from 'next/link';

import { useSelectors } from '@/hooks/useSelectors';
import { Theme } from '@/redux/user/types';

interface Error404PageProps {}

const Error404Page: NextPage<Error404PageProps> = ({}) => {
  const { theme } = useSelectors((state) => state.user);

  return (
    <div className="error404__wrapper">
      <div className="error404">
        {theme !== Theme.light ? (
          <img src="./img/error404.svg" alt="error404" />
        ) : (
          <img src="./img/error404(2).svg" alt="error404" />
        )}
        <h3>Страница не найдена</h3>
        <Link href="/" className="btn">
          На главную
        </Link>
      </div>
    </div>
  );
};

export default Error404Page;
