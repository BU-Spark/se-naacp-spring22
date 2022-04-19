import React from 'react';

export default function Home(props) {
  const { isActive = false } = props;
  return (
    <svg width={46} height={50} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.475 45h-7.474V27.5a2.5 2.5 0 0 0-2.5-2.5h-15a2.498 2.498 0 0 0-2.5 2.5V45H5.5l.014-21.043L22.995 6.08l17.506 17.98L40.474 45ZM18 45h10V30H18v15Zm26.06-24.538L24.788.752c-.942-.962-2.633-.962-3.575 0L1.938 20.466C1.025 21.403.5 22.712.5 24.06V45c0 2.758 2.118 5 4.72 5h35.558c2.602 0 4.723-2.242 4.723-5V24.06c0-1.348-.526-2.657-1.44-3.598Z"
        fill={isActive ? '#1D4ED8' : '#757D8A'}
      />
    </svg>
  );
}
