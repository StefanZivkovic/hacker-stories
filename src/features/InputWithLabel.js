import React from "react";

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
      <label htmlFor={id} className="label">
        {children}
      </label>
      <input
        className="input"
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
