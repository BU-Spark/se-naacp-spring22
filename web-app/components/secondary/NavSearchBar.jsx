import React from 'react';
import { XIcon } from '@heroicons/react/outline';

export default function NavSearchBar(props) {
  const { placeHolder, onChange, query, onSubmit } = props;

  const handleChange = event => {
    onChange(event.target.value);
  };

  const handleSubmit = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      onSubmit(event.target.value);
    }
  };

  const handleClear = event => {
    event.preventDefault();
    onChange('');
    onSubmit('');
  };

  return (
    <div className="flex justify-center bg-gray-300 flex-1 rounded-3xl">
      <img src="/images/search.svg" alt="hero" className="w-5 mx-3" />
      <div className="w-full flex">
        <input
          placeholder={placeHolder}
          value={query}
          onChange={handleChange}
          onKeyDown={handleSubmit}
          className="bg-gray-300 py-3 w-full text-base placeholder-gray-500 text-black-700 focus:outline-none rounded-r-3xl"
        />
        {query.length > 0 && (
          <button
            type="button"
            className="justify-center rounded-full pl-1 pr-3 py-1 text-gray-700 focus:outline-none"
            onClick={handleClear}>
            <XIcon className="h-4 w-4 text-gray-800" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
