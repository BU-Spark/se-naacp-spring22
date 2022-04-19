import React, { PureComponent } from 'react';

class Button extends PureComponent {
  render() {
    const { onClick, text, textClass = '', classNames = '', loading, disabled } = this.props;
    return (
      <button
        disabled={loading || disabled}
        onClick={onClick}
        className={` rounded-md px-8  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer '} ${classNames}`}>
        <p className={`font-medium py-3 px-6 text-sm ${textClass}`}>{text}</p>
      </button>
    );
  }
}

export default Button;
