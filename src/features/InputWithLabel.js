import React from "react";

import styles from "../App.module.css";

const InputWithLabel = ({
  id,
  type = "text",
  value,
  onInputChange,
  autoFocus,
  children,
}) => {
  const inputRef = React.useRef();

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
