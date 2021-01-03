import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { MultiItemsCarousel } from "../components/Carousel";
import reviewsActions from "../redux/actions/reviews.actions";
import "../style/HomePage.css";

const HomePage = () => {
  const reviews = useSelector((states) => states.reviews.reviews);
  const isLoading = useSelector((states) => states.reviews.isLoading);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reviewsActions.getReviews());
  }, [dispatch]);

  const getReviewCardsList = () => {
    const cards = reviews.map((review) => (
      <ReviewCard
        avatar={review.avatar}
        clinicName={review.clinicName}
        address={review.address}
        description={review.desc}
        comment={review.comment}
        rating={review.rating}
        key={review.clinicName}
        onClick={() => {
          history.push("/clinic/25111997");
        }}
      />
    ));

    return cards;
  };

  return (
    <div className="wrapper">
      <section className="slogan">
        <h1 className="feel">Feeling mehh? Find a doctor.</h1>
      </section>
      <section className="reviews-carousel">
        {isLoading ? (
          <LoadingSpinner animation="border" color="danger" />
        ) : (
          <MultiItemsCarousel items={getReviewCardsList()} />
        )}
      </section>
    </div>
  );
};

const ReviewCard = ({
  avatar,
  clinicName,
  address,
  description,
  comment,
  rating,
  onClick,
}) => {
  const infoStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };
  return (
    <div class="home-page-review-card" onClick={onClick}>
      <div style={infoStyle}>
        <div>
          <img
            className="clinic-avatar"
            style={{ borderRadius: "50%", width: "60px", height: "60px" }}
            src={avatar}
            alt="clinic avatar"
          />
        </div>
        <div style={{ paddingLeft: 20 }}>
          <h4 className="clinic-name-review-card">{clinicName}</h4>
          <p className="clinic-address-review-card">{address}</p>
          <p className="clinic-description-review-card">{description}</p>
        </div>
      </div>
      <div className="horizontal-divider-review-card"></div>
      <p style={{ padding: "10px 0px" }}>
        <i style={{ color: "#fdb827" }} className="fas fa-star"></i>
        {" " + rating}
      </p>
      <p style={{ margin: 0 }}>
        "{comment.length > 50 ? comment.slice(0, 50) + "..." : comment}"
      </p>
    </div>
  );
};

export default HomePage;
