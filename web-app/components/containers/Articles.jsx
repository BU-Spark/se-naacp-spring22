import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import articleService from '../../services/articleService';
import ArticleCard from '../secondary/ArticleCard';
import UploadArticleCard from '../secondary/UploadArticleCard';

export default function Articles() {
    const [apiLoading, setApiLoading] = useState(false);
    const [articles, setArticles] = useState([]);

    const router = useRouter();
    const { query } = router;

    async function getArticles(query) {
        try {
            setApiLoading(true);
            const response = (await articleService.getUserArticles({ query, limit: 10, page: 1 })).data;
            setArticles(response.articles);
            setApiLoading(false);
        } catch (err) {
            setApiLoading(false);
        }
    }
    useEffect(() => {
        getArticles(query.query);
    }, [query.query]);

    const handleDeleteArticle = async id => {
        try {
            setApiLoading(true);
            await articleService.deleteArticle(id).data;
            const updatedArticles = articles.filter(article => article._id !== id);
            setApiLoading(false);
            setArticles(updatedArticles);
        } catch (err) {
            setApiLoading(false);
        }
    };

    return (
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-16 pt-8 pb-32 py-8">
            <h3 className="text-2xl text-hint-nav">Your Articles</h3>
            <div className="grid grid-cols-1 md:gap-12 lg:gap-4 xl:gap-16 md:grid-cols-2 lg:grid-cols-4 mt-8">
                {articles.length > 0 && (
                    <>
                        {articles.map((article, index) => (
                            <ArticleCard
                                key={article._id}
                                id={article._id}
                                title={article.title}
                                createdAt={article.createdAt}
                                content={article.content}
                                link={`/articles/${article.slug}`}
                                onDeleteArticle={handleDeleteArticle}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
