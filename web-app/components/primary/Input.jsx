import React, { Component } from 'react';
import Eye from '../icons/Eye';

class Input extends Component {
  state = {
    passwordVisible: false,
  };

  setPasswordVisible = event => {
    event.preventDefault();
    const { passwordVisible } = this.state;

    this.setState({ passwordVisible: !passwordVisible });
  };

  handleChange = event => {
    event.preventDefault();
    const { value } = event.target;
    const { onChange, name } = this.props;
    onChange(name, value);
  };

  render() {
    const {
      name,
      label,
      placeholder,
      error,
      defaultValue,
      autoComplete,
      marginTop,
      type = 'text',
      value,
      onChange,
      ...rest
    } = this.props;
    const { passwordVisible } = this.state;

    return (
      <React.Fragment>
        {type === 'password' ? (
          <div className={`mb-2 ${marginTop ?? ''}`}>
            <label className="text-gray-800 text-sm font-medium block mt-2" htmlFor={name}>
              {label}
            </label>
            <div className="flex relative  mt-2 ">
              <input
                id={name}
                name={name}
                value={value}
                onChange={this.handleChange}
                type={passwordVisible ? 'text' : 'password'}
                {...(autoComplete ? { autoComplete } : {})}
                className={`bg-gray-200 focus:bg-gray-200 py-3 px-2 text-gray-800 text-base rounded w-full border-gray-300 ${
                  error ? 'border-red-600' : ''
                }`}
                {...rest}
              />
              <button className="inline self-center absolute right-2" onClick={this.setPasswordVisible}>
                <Eye />
              </button>
            </div>
            {error && <span className="text-red-500 text-xs">{error.message ?? error}</span>}
          </div>
        ) : (
          <div className={`flex flex-col flex-1 ${marginTop ?? ''}`}>
            <label className="text-gray-800 text-sm font-medium block mt-2" htmlFor={name}>
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={this.handleChange}
              {...(autoComplete ? { autoComplete } : {})}
              {...(defaultValue ? { defaultValue } : {})}
              className={`bg-gray-200 focus:bg-gray-200 py-3 px-2 text-gray-800 text-base mt-2 rounded w-full placeholder-black-nav border-gray-300 ${
                error ? 'border-red-600' : ''
              }`}
              {...rest}
            />
            {error && <span className="text-red-500 text-xs">{error.message ?? error}</span>}
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default Input;
