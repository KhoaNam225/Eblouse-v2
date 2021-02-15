import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import clinicsActions from "../redux/actions/clinics.actions";
import LoadingSpinner from "../components/LoadingSpinner";
import BookingCreateForm from "./Clinic/BookingCreateForm";
import { MultiItemsCarousel } from "../components/Carousel";
import ClinicReview from "../components/ClinicReview";

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

const ClinicDetailPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const clinicId = params.id;

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(null);

  const clinic = useSelector((state) => state.clinics.clinic);
  const isLoading = useSelector((state) => state.clinics.isLoading);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(clinicsActions.getClinic(clinicId));
  }, [dispatch]);

  const sectionStyle = {
    borderTop: "2px solid #dfe0df",
    padding: "20px 0px",
  };
  const handleInputReviewChange = (e) => {
    setReviewText(e.target.value);
  };
  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(
      clinicsActions.createNewReview(clinicId, user._id, reviewText, rating)
    );
    setReviewText("");
    setRating(null);
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
        {clinic ? (
          <ClinicReview
            clinic={clinic}
            reviewText={reviewText}
            setReviewText={setReviewText}
            rating={rating}
            setRating={setRating}
            handleInputReviewChange={handleInputReviewChange}
            handleSubmitReview={handleSubmitReview}
          />
        ) : null}
      </section>
      <section className="clinic-map" style={sectionStyle}>
        <h2 style={{ textAlign: "center" }}>Our Location</h2>
        <div id="map-container">
          <MapContainer
            center={[10.780060498405208, 106.69902603952619]}
            zoom={25}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[10.780060498405208, 106.69902603952619]}>
              <Popup>
                <span style={{ fontWeight: "bold", fontSize: "1.5em" }}>
                  {clinic ? clinic.name : "Clinic Name"}
                </span>
                <br />
                <p>{clinic ? clinic.address : "Clinic Address"}</p>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </div>
  );
};

export default ClinicDetailPage;
