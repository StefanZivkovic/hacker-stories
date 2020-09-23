import React from "react";

import styles from "../App.module.css";

interface IProps {
  id: string;
  type?: string;
  value: any;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus: boolean;
  children: React.ReactNode;
}

const InputWithLabel: React.FC<IProps> = ({
  id,
  type = "text",
  value,
  onInputChange,
  autoFocus,
  children,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
      <input
        className={styles.input}
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        autoFocus={autoFocus}
        onChange={onInputChange}
      />
    </>
  );
};
export default InputWithLabel;
