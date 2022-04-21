import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Loading from '../../components/primary/Loading';
import { truncateText } from '../../helpers';

import { notify } from '../../helpers/notificationHelper';
import articleService from '../../services/articleService';

export default function index() {
  const [error, setError] = useState({});
  const [article, setArticle] = useState(undefined);
  const [pageLoading, setPageLoading] = useState(true);

  const router = useRouter();
  const { slug } = router.query;

  async function getArticle(slug) {
    setPageLoading(true);
    try {
      const response = (await articleService.getArticle(slug)).data;
      setArticle(response.article);
    } catch (error) {
      notify.error('Error retrieving article');
    } finally {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    getArticle(slug);
  }, [slug]);

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-32 py-8 h-full">
      {pageLoading ? (
        <div>
          <Loading />
          <span>Fetching Article</span>
        </div>
      ) : (
        <>
          {article ? (
            <>
              <h3 className="text-2xl font-medium">{truncateText(article.title, 76)}</h3>
              <div className="grid grid-cols-1 md:gap-12 md:grid-cols-12 mt-8 h-5/6">
                <div className="col-span-7 border-2 border-black px-8 py-10 overflow-scroll text-lg">
                  {article.content}
                </div>
                <div className="col-span-5 px-8">
                  <h3 className="text-2xl font-medium">Suggestions</h3>
                  <div className="border border-black px-6 py-3">
                    <h3>Term: Demo UI Only, Logic not integrated yet</h3>
                    <p className="bg-red-300 inline-block px-1 mt-3 mb-4">Suspendisse</p>
                    <p className="mb-6">Reasong & Suggestion to change:</p>

                    <div className="flex justify-between">
                      <button className="self-end mb-1 bg-gray-300 rounded-3xl px-6" onClick={() => {}}>
                        <span>Apply</span>
                      </button>
                      <button className="self-end mb-1" onClick={() => {}}>
                        <img className="w-5 h-5" src="/images/trash.svg" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <span>Error fetching Article</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
