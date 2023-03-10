import ss from "./NotFound.module.scss";
import React from "react";

interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = ({}) => {
  return (
    <div className={ss.notfound}>
      <svg width="20" height="20">
        <use xlinkHref="../img/icons/icons.svg#search" />
      </svg>
      <h4></h4>
      <p>По вашему запросу ничего не было найдено :(</p>
    </div>
  );
};
