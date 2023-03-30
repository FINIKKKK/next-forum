import React from 'react';

import { usePressKey } from '@/hooks/usePressKey';

import ss from './EditQuestionTitle.module.scss';

interface EditQuestionTitleProps {
  value: string;
  setValue: (e: any) => void;
  error?: string;
}

export const EditQuestionTitle: React.FC<EditQuestionTitleProps> = ({
  error,
  value,
  setValue,
}) => {
  const refTextarea = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (refTextarea.current) {
      refTextarea.current.style.height = 'auto';
      refTextarea.current.style.height =
        refTextarea.current.scrollHeight + 3 + 'px';
    }
  }, [value]);

  return (
    <div className={`inputBlock ${ss.input}`}>
      <textarea
        ref={refTextarea}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Заголовок"
        maxLength={200}
        rows={1}
        onKeyPress={(e: any) => usePressKey(e, 'Enter')}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
};
