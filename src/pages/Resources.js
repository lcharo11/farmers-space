import React, { useState, useEffect } from 'react';
import './Resources.css';

const youtubeApiKey = 'AIzaSyC8dT8JlzZZET5vL79wYaE-eP3ote8Q0qc';
const newsApiKey = 'f286966bfd6d49b2b00f708ec3cbcfe5'; // Replace with your actual NewsAPI key

function Resources() {
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch YouTube videos
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=agriculture&key=${youtubeApiKey}`)
      .then(response => response.json())
      .then(data => {
        const videoList = data.items.map(video => ({
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.default.url,
          url: `https://www.youtube.com/watch?v=${video.id.videoId}`
        }));
        setVideos(videoList);
      })
      .catch(error => console.error('Error fetching videos:', error));

    // Fetch news articles
    fetch(`https://newsapi.org/v2/everything?q=agriculture&apiKey=${newsApiKey}`)
      .then(response => response.json())
      .then(data => {
        const articleList = data.articles.map(article => ({
          title: article.title,
          date: new Date(article.publishedAt).toLocaleDateString(),
          summary: article.description,
          url: article.url,
          imageUrl: article.urlToImage
        }));
        setArticles(articleList);
      })
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  return (
    <div className="resources">
      <h1>Resources for Farmers</h1>
      <p>Find the best resources to help you with your farming needs.</p>
      
      <div className="section videos-section">
        <h2>YouTube Videos</h2>
        <div className="video-list">
          {videos.map((video, index) => (
            <div key={index} className="video-item">
              <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
              <h3>{video.title}</h3>
              <a href={video.url} target="_blank" rel="noopener noreferrer">Watch now</a>
            </div>
          ))}
        </div>
      </div>

      <div className="section articles-section">
        <h2>Articles</h2>
        <div className="article-list">
          {articles.map((article, index) => (
            <div key={index} className="article-item">
              {article.imageUrl && <img src={article.imageUrl} alt={article.title} className="article-image" />}
              <h3>{article.title}</h3>
              <small>{article.date}</small>
              <p>{article.summary}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Resources;