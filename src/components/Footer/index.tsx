import React from "react";

import ss from "./Footer.module.scss";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner"></div>
      </div>
      <div className="copy">
        <p>Создатель макета Dmitriy Bozhko</p>
      </div>
    </footer>
  );
};
