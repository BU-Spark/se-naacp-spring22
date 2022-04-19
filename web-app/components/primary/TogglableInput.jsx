import React from 'react';

function TogglableInput(props) {
  const { name, placeHolder, error, defaultValue, type = 'text', value, onChange, className = '', ...rest } = props;

  const handleChange = event => {
    event.preventDefault();
    const { value } = event.target;
    const { onChange, name } = props;
    onChange(name, value);
  };

  return (
    <div className="flex flex-col flex-1">
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeHolder}
        value={value}
        onChange={handleChange}
        {...(defaultValue ? { defaultValue } : {})}
        className={`rounded w-36 ${className} ${error ? 'border-2 border-red-600' : 'border-none '}`}
        {...rest}
      />
      {error && <span className="text-red-500 text-xs">{error.message ?? error}</span>}
    </div>
  );
}
export default TogglableInput;
