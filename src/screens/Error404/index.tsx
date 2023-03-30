import Link from 'next/link';
import React from 'react';

import { useSelectors } from '@/hooks/useSelectors';
import { Theme } from '@/redux/user/types';

import ss from './Error404.module.scss';

interface Error404Props {
  title: string;
  text: string;
}

export const Error404: React.FC<Error404Props> = ({ title, text }) => {
  const { theme } = useSelectors((state) => state.user);

  return (
    <div className={ss.error404}>
      <div className={ss.inner}>
        <h1>{title}</h1>
        {theme !== Theme.light ? (
          <img src="./img/error404.svg" alt="error404" />
        ) : (
          <img src="./img/error404(2).svg" alt="error404" />
        )}
        <h3>{text}</h3>
        <Link href="/" className={ss.btn}>
          <svg
            width="17"
            height="11"
            viewBox="0 0 17 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.4309 4.90966C16.7477 4.91811 17 5.17996 17 5.50005C17 5.82014 16.7477 6.08199 16.4309 6.09057L2.76795 6.4586L6.10472 10.1845C6.25518 10.3526 6.24886 10.6103 6.09022 10.7706C5.9304 10.9321 5.67295 10.9373 5.5068 10.7825L0.870278 6.45865L0.0556331 5.63572C-0.0185458 5.56085 -0.0185458 5.4395 0.0556331 5.36463L0.870278 4.54157L5.5068 0.217697C5.67294 0.0628069 5.93041 0.0679551 6.09022 0.229449C6.24886 0.389755 6.25518 0.647504 6.10472 0.815611L2.76795 4.54149L16.4309 4.90966Z"
              fill="#74707F"
            />
          </svg>
          <p>На главную</p>
        </Link>
      </div>
    </div>
  );
};
