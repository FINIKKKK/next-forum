import React from "react";

import ss from "./Header.module.scss";

interface NoticesProps {}

export const Notices: React.FC<NoticesProps> = ({}) => {
  return (
    <div className={ss.notices}>
      <svg className={ss.icon} width="20" height="20">
        <use xlinkHref="../img/icons/icons.svg#bell" />
      </svg>
      <span className={ss.number}>13</span>
    </div>
  );
};
