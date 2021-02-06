import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import clinicsActions from "../redux/actions/clinics.actions";
import LoadingSpinner from "../components/LoadingSpinner";
import BookingCreateForm from "./Clinic/BookingCreateForm";
import { MultiItemsCarousel } from "../components/Carousel";

import "../style/ClinicDetailPage.css";

const ClinicShowcase = ({ clinic }) => {
  const { name, specializations, address, avgRating, reviews, images } = clinic;
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="showcase-wrapper">
      <div className="clinic-basic-info">
        <div className="name-address">
          <h2 className="clinic-name">{name}</h2>
          <div className="divider"></div>
          <p className="clinic-address">{address}</p>
        </div>
        <div className="rating-specialization">
          <p className="rating">
            <i style={{ color: "#fdb827" }} className="fas fa-star"></i>
            {`   ${avgRating} (${reviews.length})`}
          </p>
          <ul className="specialization">
            {specializations.map((spec, index) => (
              <li key={index}>{spec.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="clinic-images">
        <div className="main-image">
          <img src={images[selectedImage]} alt="clinic" />
        </div>
        <div className="image-grid">
          {images.map((image, index) => (
            <div
              className="showcase-image-wrapper"
              key={index}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image} alt="more-clinic" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ClinicInfo = ({ clinic }) => {
  const {
    name,
    doctors,
    statement,
    services,
    registerNumber,
    languages,
  } = clinic;

  const CertificateDisplayCard = ({ title, content, icon }) => {
    const iconStyle = {
      padding: "0px 20px",
      fontSize: "2.5em",
    };

    const headerStyle = {
      margin: 0,
      padding: "5px 10px",
      fontSize: "0.8em",
      fontWeight: "bold",
    };

    const contentStyle = {
      margin: 0,
      padding: "5px 10px",
      fontSize: "0.8em",
      fontStyle: "italic",
    };

    return (
      <div className="certificates-display">
        <div style={iconStyle}>{icon}</div>
        <div>
          <h5 style={headerStyle}>{title}</h5>
          <p style={contentStyle}>{content}</p>
        </div>
      </div>
    );
  };

  const DoctorInfoCard = ({ doctor }) => {
    const {
      firstName,
      lastName,
      specialization,
      avatarUrl,
      gender,
      status,
    } = doctor;
    return (
      <div className="doctor-info-card">
        <div className="avatar-wrapper">
          <img
            src={avatarUrl}
            alt="doctor avatar"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        </div>
        <div className="doctor-info">
          <p
            style={{ fontSize: "1.1em", fontWeight: "bold", paddingBottom: 5 }}
          >{`Dr. ${firstName} ${lastName}`}</p>
          <p
            style={{
              fontSize: "0.8em",
              fontStyle: "italic",
              color: "grey",
            }}
          >
            {specialization.map((spec, index) => (
              <span key={index}>{`${spec.name}   `}</span>
            ))}
          </p>
          <p
            style={{
              fontSize: "0.8em",
              fontStyle: "italic",
              fontWeight: "lighter",
              paddingBottom: "5px",
            }}
          >
            {gender}
          </p>
          <p
            style={{
              fontSize: "1em",
              fontWeight: "bold",
              paddingBottom: 5,
            }}
          >
            Working Status:
          </p>
          <p style={{ fontSize: "0.8em" }}>
            <span style={{ color: "grey" }}>{status}</span>
          </p>
        </div>
      </div>
    );
  };

  const getDoctorInfoCardList = () => {
    return doctors.map((doctor, index) => (
      <DoctorInfoCard key={index} doctor={doctor} />
    ));
  };

  return (
    <div className="info-wrapper">
      <div className="meta">
        <div className="statement" style={{ padding: "0px 20px" }}>
          <h4 style={{ margin: 0 }}>{name}</h4>
          <p>{statement}</p>
        </div>
        <div className="certificates">
          <CertificateDisplayCard
            title="Vietnam National Health Insurance"
            content="Accepted"
            icon={<i className="fas fa-file-medical"></i>}
          />
          <CertificateDisplayCard
            title="Languages"
            content={languages.join(", ")}
            icon={<i className="fas fa-language"></i>}
          />
          <CertificateDisplayCard
            title="Board Certification"
            content=""
            icon={<i className="fas fa-award"></i>}
          />
          <CertificateDisplayCard
            title="Register Number"
            content={registerNumber}
            icon={<i className="far fa-address-card"></i>}
          />
        </div>
        <div className="services">
          <h4>Medical Services</h4>
          <ul className="service-list">
            {services.map((service) => (
              <li key={service}>
                <i
                  className="fas fa-check"
                  style={{ marginRight: "0.5em" }}
                ></i>{" "}
                {"    " + service.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="doctors-list">
          <h4>Doctors</h4>
          <MultiItemsCarousel
            items={getDoctorInfoCardList()}
            slidesNum={1}
            offset={0}
          />
        </div>
      </div>
      <BookingCreateForm doctors={doctors} clinicId={clinic._id} />
    </div>
  );
};

const ClinicReview = ({ clinic }) => {
  const { avgRating, reviews } = clinic;
  const [reviewsNum, setReviewsNum] = useState(4);

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
            <p style={{ padding: "0px", margin: 0, fontSize: "0.8em" }}>
              <i style={{ color: "#fdb827" }} className="fas fa-star"></i>
              {" " + review.rating}
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
      setReviewsNum(reviewsNum * 4);
    }
  };

  return (
    <div className="clinic-reviews-wrapper">
      <div className="header" style={{ paddingBottom: "50px" }}>
        <h2>
          <i
            style={{ color: "#fdb827", marginRight: "0.5em" }}
            className="fas fa-star"
          ></i>
          {`${avgRating} - Patient Reviews`}
        </h2>
      </div>
      <div className="reviews-detail">{getReviewCards(reviewsNum)}</div>
      {reviewsNum < reviews.length ? (
        <button onClick={() => handleShowMore()}>Show More</button>
      ) : null}
    </div>
  );
};

const ClinicDetailPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const clinicId = params.id;

  const clinic = useSelector((state) => state.clinics.clinic);
  const isLoading = useSelector((state) => state.clinics.isLoading);

  useEffect(() => {
    dispatch(clinicsActions.getClinic(clinicId));
  }, [dispatch, clinicId]);

  const sectionStyle = {
    borderTop: "2px solid #dfe0df",
    padding: "20px 0px",
  };

  return isLoading ? (
    <LoadingSpinner animation="border" color="success" />
  ) : (
    <div className="wrapper">
      <section style={sectionStyle} className="clinic-showcase">
        {clinic ? <ClinicShowcase clinic={clinic} /> : null}
      </section>
      <section className="clinic-info" style={sectionStyle}>
        {clinic ? <ClinicInfo clinic={clinic} /> : null}
      </section>
      <section className="clinic-reviews" style={sectionStyle}>
        {clinic ? <ClinicReview clinic={clinic} /> : null}
      </section>
      <section className="clinic-map" style={sectionStyle}>
        <h2 style={{ textAlign: "center" }}>Our Location</h2>
      </section>
    </div>
  );
};

export default ClinicDetailPage;
