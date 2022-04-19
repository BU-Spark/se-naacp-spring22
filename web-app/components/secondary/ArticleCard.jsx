import React from 'react';
import Link from 'next/link';
import { truncateText } from '../../helpers';

export default function ArticleCard(props) {
  const { title, content, link, className, createdAt, onDeleteArticle, id } = props;

  const handleDeleteClick = event => {
    event.preventDefault();
    onDeleteArticle(id);
  };

  return (
    <div className={`pt-4 pb-6 px-4 bg-white bg-opacity-20 border border-gray-600 rounded-3xl ${className}`}>
      <Link href={link}>
        <a href={link}>
          <div className="card-body">
            <h5 className="mt-4 font-semibold">{new Date(createdAt).toLocaleDateString()}</h5>
            <h5 className="mt-2 mb-4 text-xl font-medium">{truncateText(title, 24)}</h5>
            <p className="text-base">{truncateText(content, 99)}</p>
          </div>
        </a>
      </Link>
      <div className="flex justify-between">
        <p className="text-xl font-semibold mt-5">11</p>
        <button className="self-end mb-1" onClick={handleDeleteClick}>
          <img className="w-5 h-5" src="/images/trash.svg" alt="" />
        </button>
      </div>
    </div>
  );
}
