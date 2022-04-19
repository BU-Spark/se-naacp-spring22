import React from 'react';

function Eye(props) {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M22.82 12C21.877 6.88 17.391 3 12 3S2.121 6.88 1.181 12c.941 5.12 5.427 9 10.82 9 5.391 0 9.878-3.88 10.818-9zm-2.043 0A9.005 9.005 0 0112 19a9.005 9.005 0 01-8.777-7 9.005 9.005 0 0117.554 0zM12 16.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm2.5-4.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default Eye;
