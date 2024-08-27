import { useState, useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import React from 'react';

const Reviews = ({ getMovieData, movie }) => {
  // Initialize reviews as an empty array
  const [reviews, setReviews] = useState([]); 

  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  // Fetch movie data when the component mounts or the movieId changes
  useEffect(() => {
    getMovieData(movieId);
  }, [movieId, getMovieData]);

  // Function to add a new review
  const addReview = async (e) => {
    e.preventDefault();
    
    const rev = revText.current;

    try {
      const response = await api.post("/api/v1/reviews", { 
        reviewBody: rev.value, 
        imdbId: movieId 
      });

      // Update reviews safely as an array and add the new review
      const updatedReviews = [...(reviews || []), { body: rev.value }];

      rev.value = ""; // Clear the textarea after submission
      setReviews(updatedReviews); // Update the reviews state with the new review
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col><h3>Reviews</h3></Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="Movie Poster" />
        </Col>
        <Col>
          <>
            <Row>
              <Col>
                {/* Pass the addReview function, revText reference, and label text to ReviewForm */}
                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
              </Col>
            </Row>
            <Row>
              <Col><hr /></Col>
            </Row>
          </>
          {/* Render the list of reviews */}
          {Array.isArray(reviews) && reviews.map((r, index) => (
            <div key={index}>
              <Row>
                <Col>{r.body}</Col>
              </Row>
              <Row>
                <Col><hr /></Col>
              </Row>
            </div>
          ))}
        </Col>
      </Row>
      <Row>
        <Col><hr /></Col>
      </Row>
    </Container>
  );
};

export default Reviews;