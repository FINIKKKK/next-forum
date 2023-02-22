import Link from "next/link";
import React from "react";

import ss from "./Tag.module.scss";

interface TagProps {
  name: string;
  description: string;
  questionCount: number;
}

export const Tag: React.FC<TagProps> = ({
  name,
  description,
  questionCount,
}) => {
  return (
    <div className={`block ${ss.tag}`}>
      <div className={ss.header}>
        <Link className="hover" href={`/?tagBy=${name}`}>
          {name}
        </Link>
        <div className={ss.used}>({questionCount})</div>
      </div>
      <p>{description}</p>
    </div>
  );
};
