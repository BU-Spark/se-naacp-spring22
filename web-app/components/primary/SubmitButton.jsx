import React, { PureComponent } from 'react';
import Loading from './Loading';

class SubmitButton extends PureComponent {
  render() {
    const { text, classNames, loading, disabled, onClick } = this.props;
    return (
      <>
        {loading ? (
          <div className={`py-1 px-16 mt-6 cursor-not-allowed rounded-md w-full ${classNames}`}>
            <Loading className="my-0 mx-auto" />
          </div>
        ) : (
          <input
            type="submit"
            disabled={loading || disabled}
            value={text}
            {...(onClick ? { onClick } : {})}
            className={`font-medium py-3 px-8 md:px-10 lg:px-16 mt-6 rounded-md text-xs sm:text-sm w-full ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer '
            } ${classNames}`}
          />
        )}
      </>
    );
  }
}

export default SubmitButton;
