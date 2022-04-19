import React from 'react';

const colorMap = {
  success: 'bg-success-default',
  danger: 'bg-red-500',
};

export default function ToastNotification({ title, message }) {
  return (
    <div>
      {title && <h5 className="text-s font-semibold font-roobert">{title}</h5>}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
