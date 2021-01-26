import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { MultiItemsCarousel } from "../components/Carousel";
import reviewsActions from "../redux/actions/reviews.actions";
import "../style/HomePage.css";
import screen from "../images/screen.png";

const HomePage = () => {
  const reviews = useSelector((states) => states.reviews.reviews);
  const isLoading = useSelector((states) => states.reviews.isLoading);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reviewsActions.getRandomReviews());
  }, [dispatch]);

  const getReviewCardsList = () => {
    const cards = reviews.map((review) => (
      <ReviewCard
        avatar={review.user.avatarUrl}
        clinicName={review.clinic.name}
        address={review.clinic.address}
        description={"Description Here"}
        comment={review.content}
        rating={review.rating}
        key={review._id}
        onClick={() => {
          history.push(`/clinic/${review.clinic._id}`);
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
          <MultiItemsCarousel
            items={getReviewCardsList()}
            offset={30}
            slidesNum={3}
          />
        )}
      </section>
      {/* second paragraph */}
      <section id="between2">
        <div className="container2">
          <div className="hinh-screen">
            <img src={screen} alt="iphone-img" className="iphone-img" />
          </div>
          <div className="lis-right">
            <h2 className="get-app">Get the Eblouse app.</h2>
            <ul className="list-one">
              <li className="list-1">Find nearly doctors in your area</li>
              <li className="list-1">Browse real patient reviews</li>
              <li className="list-1">Book appointment with a tap</li>
            </ul>
            <button id="get-app">
              GET <span className="span1">EBLOUSE</span> FREE
            </button>
          </div>
        </div>
      </section>
      {/* pink paragraph */}
      <section id="between3">
        <div className="container3">
          <div className="h2-list">
            <h2 className="are-you-doctor">Are you a five-star clinic?</h2>
            <h2 className="bet3">
              List your practice to reach millions of patients
            </h2>
            <ul className="list-two">
              <li className="list-2">Attract and engage new patients</li>
              <li className="list-2">
                Build and strengthen your online reputation
              </li>
              <li className="list-2">
                Deliver a prenium experience patients love
              </li>
            </ul>
            <button className="list-practice" placeholder="">
              List your practice on Eblouse
            </button>
          </div>
        </div>
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
    <div className="home-page-review-card" onClick={onClick}>
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
