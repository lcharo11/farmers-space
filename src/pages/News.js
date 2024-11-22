import React, { useState, useEffect } from 'react';
import './News.css';

const apiKey = 'f286966bfd6d49b2b00f708ec3cbcfe5'; // Replace with your actual API key

function News() {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    fetch(`https://newsapi.org/v2/everything?q=agriculture&apiKey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const articles = data.articles.map(article => ({
          title: article.title,
          date: new Date(article.publishedAt).toLocaleDateString(),
          summary: article.description,
          url: article.url,
          imageUrl: article.urlToImage // Include the image URL
        }));
        setNewsArticles(articles);
      })
      .catch(error => console.error('Error fetching news articles:', error));
  }, []);

  return (
    <div className="news">
      <h1>News & Updates</h1>
      <p>Stay informed with the latest agricultural news and updates.</p>
      <div className="news-list">
        {newsArticles.map((article, index) => (
          <div key={index} className="news-item">
            {article.imageUrl && <img src={article.imageUrl} alt={article.title} className="news-image" />}
            <h2>{article.title}</h2>
            <p><small>{article.date}</small></p>
            <p>{article.summary}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;