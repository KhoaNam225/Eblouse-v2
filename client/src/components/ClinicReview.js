import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import ReviewForm from "./ReviewForm";

const ClinicReview = ({
  clinic,
  reviewText,
  rating,
  setRating,
  handleInputReviewChange,
  handleSubmitReview,
}) => {
  const { avgRating, reviews } = clinic;
  const [reviewsNum, setReviewsNum] = useState(4);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const ReviewCard = ({ review }) => {
    return (
      <div className="reviews-card">
        <div
          className="user-info"
          style={{ paddingTop: 20, paddingBottom: 20 }}
        >
          <div className="avatar-wrapper">
            <img
              src={review.user.avatarUrl}
              alt="user avatar"
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="user-detail" style={{ padding: "10px 20px" }}>
            <p
              style={{
                margin: 0,
                fontSize: "1.1em",
                fontWeight: "bold",
              }}
            >
              {`${review.user.name}`}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "0.8em",
                color: "grey",
                fontStyle: "italic",
              }}
            >
              {new Date().toLocaleDateString(undefined, {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="review-content">
          <p
            style={{
              fontSize: "0.9em",
              fontWeight: 200,
            }}
          >
            {review.content}
          </p>
        </div>
      </div>
    );
  };

  const getReviewCards = (reviewsNum = 4) => {
    return reviews
      .slice(0, reviewsNum)
      .map((review, index) => <ReviewCard key={index} review={review} />);
  };

  const handleShowMore = () => {
    if (reviewsNum < reviews.length) {
      setReviewsNum(reviewsNum + 4);
    }
  };

  return (
    <Container>
      <div className="clinic-reviews-wrapper">
        <div className="header" style={{ paddingBottom: "50px" }}>
          <h2>
            <i
              style={{ color: "#fdb827", marginRight: "0.5em" }}
              className="fas fa-star"
            ></i>
            {`${Math.round(avgRating * 10) / 10} - Patient Reviews`}
          </h2>
        </div>
        <div className="reviews-detail">{getReviewCards(reviewsNum)}</div>
        {reviewsNum < reviews.length ? (
          <button onClick={() => handleShowMore()}>Show More</button>
        ) : null}
      </div>
      <div className="clinic-review-input">
        {isAuthenticated && (
          <ReviewForm
            reviewText={reviewText}
            rating={rating}
            setRating={setRating}
            handleInputReviewChange={handleInputReviewChange}
            handleSubmitReview={handleSubmitReview}
          />
        )}
      </div>
    </Container>
  );
};
export default ClinicReview;
