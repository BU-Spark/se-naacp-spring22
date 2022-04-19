import React from 'react';
import Link from 'next/link';

export default function UploadArticleCard(props) {
  return (
    <div className="py-20 px-4 bg-white bg-opacity-20 border border-gray-600 rounded-3xl">
      <Link href="/compare">
        <a href="/compare">
          <div className="card-body flex flex-col justify-center h-full">
            <img className="w-1/4 self-center" src="/images/upload-article.svg" alt="" />
            <h3 className="text-center">Upload an article</h3>
          </div>
        </a>
      </Link>
    </div>
  );
}
