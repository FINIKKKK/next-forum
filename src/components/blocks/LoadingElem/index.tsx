import React from "react";

import ss from "./LoadingElem.module.scss";

interface LoadingElemProps {
  className?: string;
}

export const LoadingElem: React.FC<LoadingElemProps> = ({
  className,
}) => {
  return <div className={`${className} ${ss.loading}`}></div>;
};
