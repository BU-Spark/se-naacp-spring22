import React from 'react';

export default function Compare(props) {
  const { isActive = false } = props;
  return (
    <svg width={46} height={46} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5 25.5V23c0-4.135 3.365-7.5 7.5-7.5h2.5V7.168c0-.92-.747-1.668-1.668-1.668H7.168c-.92 0-1.667.747-1.667 1.668v16.665c0 .92.747 1.667 1.668 1.667H15.5Zm0 5H7.168A6.674 6.674 0 0 1 .5 23.832V7.168A6.674 6.674 0 0 1 7.168.5h16.665A6.674 6.674 0 0 1 30.5 7.168V15.5H38c4.135 0 7.5 3.365 7.5 7.5v15c0 4.135-3.365 7.5-7.5 7.5H23c-4.135 0-7.5-3.365-7.5-7.5v-7.5Zm5-7.5c0-1.378 1.122-2.5 2.5-2.5h15c1.38 0 2.5 1.122 2.5 2.5v15c0 1.377-1.12 2.5-2.5 2.5H23a2.504 2.504 0 0 1-2.5-2.5V23Z"
        fill={isActive ? '#1D4ED8' : '#757D8A'}
      />
    </svg>
  );
}
