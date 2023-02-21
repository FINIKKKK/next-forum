import classNames from "classnames";
import React from "react";

import ss from "./Textarea.module.scss";

interface TextareaProps {
  className?: string;
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
}

export const Textarea: React.FC<TextareaProps> = ({
  className,
  value,
  setValue,
  onSubmit,
}) => {
  const refTextarea = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (refTextarea.current) {
      refTextarea.current.style.height = "auto";
      refTextarea.current.style.height =
        refTextarea.current.scrollHeight + 3 + "px";
    }
  }, [value]);

  return (
    <div className={`input ${className} ${ss.input}`}>
      <textarea
        ref={refTextarea}
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        placeholder="Введите сообщение"
        rows={1}
        maxLength={200}
      ></textarea>
      {value && (
        <svg
          onClick={onSubmit}
          className={classNames(ss.icon, {})}
          width="20"
          height="20"
        >
          <use xlinkHref="../img/icons/icons.svg#submit" />
        </svg>
      )}
    </div>
  );
};
