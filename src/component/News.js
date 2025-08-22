import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Set document title
  document.title = `${props.category} - News`;

  // Function to fetch and update news
  const updateNews = async () => {
    props.setProgress(10);
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d4530cab2a17499394529c770a3095ad&page=${page}&pageSize=${props.pageSize}`;

      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setLoading(false);
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching news:", error); // Log the error for debugging
      setLoading(false);
    }
    props.setProgress(100);
  };


  useEffect(() => {
    updateNews();
   
  }, []); 

 
  const fetchMoreData = async () => {
    const nextPage = page + 1; 
    setPage(nextPage); 
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d4530cab2a17499394529c770a3095ad&page=${nextPage}&pageSize=${props.pageSize}`;

    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };
  return (
    <div className="container my-3">
      <h1 className="text-center my-3 mb-4">Top Headlines</h1>
      {loading && page === 1 && <Spinner />} {/* Show spinner only on initial load */}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen all the news.</b>
          </p>
        }
      >
        <div className="container row">
          {articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imgurl={element.urlToImage || "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"}
                  newsurl={element.url}
                  author={element.author || "Unknown"}
                  date={element.publishedAt ? new Date(element.publishedAt).toGMTString() : "Unknown"}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

// Default props and prop types remain the same for functional components
News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general'
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,

};

export default News;