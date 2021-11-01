import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThemovieFetch } from '../../services/search-api';

const newThemovieFetch = new ThemovieFetch();

const Reviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    newThemovieFetch.id = movieId;
    newThemovieFetch
      .searchReviewsMovie()
      .then(movieReviews => {
        setMovieReviews(movieReviews);
      })
      .catch(error => {
        console.log(error);
      });
  }, [movieId]);

  return (
    <>
      {movieReviews.length ? (
        <ul>
          {movieReviews.map(review => {
            const { id, author, content, url } = review;
            return (
              <li key={id}>
                <h5>Author: {author}</h5>
                <p>{content}</p>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Source
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don`t have any reviews for this movie</p>
      )}
    </>
  );
};

export default Reviews;
