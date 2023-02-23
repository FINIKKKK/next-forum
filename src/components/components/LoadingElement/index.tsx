import React from "react";

import ss from "./LoadingElement.module.scss";

interface LoadingElementProps {
  className?: string;
}

export const LoadingElement: React.FC<LoadingElementProps> = ({
  className,
}) => {
  return <div className={`${className} ${ss.loading}`}></div>;
};
