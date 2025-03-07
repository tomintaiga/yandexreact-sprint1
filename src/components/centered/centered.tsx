import React from 'react';
import curStyle from './centered.module.css';

interface ICentered {
  children: React.ReactNode;
}

interface ICenteredForm {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void | undefined;
  children: React.ReactNode;
}

const Centered: React.FC<ICentered> = ({ children }) => {
  return (
    <div className={curStyle.top_div}>
      <div className={curStyle.child_div}>{children}</div>
    </div>
  );
};

export const CenteredForm: React.FC<ICenteredForm> = ({
  onSubmit,
  children,
}) => {
  return (
    <div className={curStyle.top_div}>
      <form className={curStyle.child_div} onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};

export default Centered;
