export const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.substr(0, maxLength - 1) + (text.length > maxLength ? '...' : '');
};
