import Link from "next/link";
import React from "react";

import ss from "./Tag.module.scss";

interface TagProps {
  name: string;
  description: string;
}

export const Tag: React.FC<TagProps> = ({ name, description }) => {
  return (
    <div className={`block ${ss.tag}`}>
      <Link className="hover" href={`/?tagBy=${name}`}>{name}</Link>
      <p>{description}</p>
    </div>
  );
};
