import React from 'react';

export default function Database(props) {
  const { isActive = false } = props;
  return (
    <svg width={50} height={44} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 26.389V37.17c0 .595.56 1.08 1.25 1.08h37.5c.69 0 1.25-.485 1.25-1.08V15.696c0-.598-.56-1.08-1.25-1.08H25c-.75 0-1.46-.338-1.935-.92l-6.5-7.945H6.25c-.69 0-1.25.482-1.25 1.077v19.56ZM43.75 43.25H6.25c-3.445 0-6.25-2.727-6.25-6.08V6.828C0 3.476 2.805.751 6.25.751h11.503c.747 0 1.46.335 1.934.917l6.498 7.948H43.75c3.445 0 6.25 2.725 6.25 6.08v21.475c0 3.352-2.805 6.08-6.25 6.08Z"
        fill={isActive ? '#1D4ED8' : '#757D8A'}
      />
    </svg>
  );
}
