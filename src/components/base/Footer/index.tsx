import React from 'react';

import ss from './Footer.module.scss';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className={ss.footer}>
      <div className="container">
        <div className={ss.inner}></div>
      </div>
      <div className={ss.copy}>
        <p>Создатель макета Dmitriy Bozhko</p>
      </div>
    </footer>
  );
};
