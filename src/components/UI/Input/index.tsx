import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { usePressKey } from '@/hooks/usePressKey';

import ss from './Input.module.scss';

interface InputProps {
  type?: string;
  label: string;
  value?: any;
  setValue?: (value: any) => void;
  text?: string;
  className?: string;
  name?: string;
}

export const Input: React.FC<InputProps> = ({
  type,
  label,
  value,
  setValue,
  text,
  className,
  name,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { register, formState } = useFormContext() || {};

  if (type === 'password') {
    return (
      <div className={`${className} ${ss.input} ${ss.password}`}>
        <label>{label}</label>
        <input
          {...(name && register(name))}
          name={name}
          value={value}
          onChange={(e) => setValue && setValue(e.target.value)}
          type={type === 'password' && !showPassword ? 'password' : 'text'}
        />
        <div className="error">{formState?.errors[name]?.message}</div>
        {value && type === 'password' && (
          <svg
            onClick={() => setShowPassword(!showPassword)}
            className={classNames(ss.eye, {
              [ss.noeye]: showPassword,
            })}
            width="20"
            height="20"
          >
            <use
              xlinkHref={`../img/icons/icons.svg#${
                !showPassword ? 'eye' : 'noeye'
              }`}
            />
          </svg>
        )}
      </div>
    );
  } else if (type === 'checkbox') {
    return (
      <div className={`${className} ${ss.input} ${ss.checkbox}`}>
        <input
          checked={value}
          onChange={(e) => setValue && setValue(e.target.checked)}
          type="checkbox"
          id="checkbox"
          name="checkbox"
        />
        <label htmlFor="checkbox">{label}</label>
      </div>
    );
  } else if (type === 'textarea') {
    return (
      <div className={`${className} ${ss.input}`}>
        <label>{label}</label>
        <textarea
          maxLength={660}
          value={value}
          onChange={(e) => setValue && setValue(e.target.value)}
          onKeyPress={(e: any) => usePressKey(e, 'Enter')}
          className="input block"
        ></textarea>
      </div>
    );
  } else if (type === 'text') {
    return (
      <div className={`${className} ${ss.text} ${ss.input}`}>
        <label>{label}</label>
        <p>{text}</p>
      </div>
    );
  } else {
    return (
      <div className={`${className} ${ss.input}`}>
        <label>{label}</label>
        <input
          {...(name && register(name))}
          name={name}
          value={value}
          onChange={(e) => setValue && setValue(e.target.value)}
          type="text"
        />
        <div className={ss.error}>{formState?.errors[name]?.message}</div>
      </div>
    );
  }
};
