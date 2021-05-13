import { ReactChild } from 'react';

type Props = {
  children: ReactChild;
  customClass?: string;
  defaultText: string;
  hide: boolean;
};

export default function Select({ hide, children, customClass, defaultText }: Props) {
  return (
    <div className={`select${customClass ? ` ${customClass}` : ``}`}>
      <button className="select-toggle">{defaultText}</button>
      <ul aria-hidden={hide} className="select-ul">
        {children}
      </ul>
    </div>
  );
}
