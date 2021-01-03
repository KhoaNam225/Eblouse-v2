import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import clinicsActions from "../redux/actions/clinics.actions";
import LoadingSpinner from "../components/LoadingSpinner";

import "../style/ClinicDetailPage.css";

const ClinicShowcase = ({ clinic }) => {
  const {
    name,
    specialization,
    address,
    rating,
    reviewNum,
    images,
    ...other
  } = clinic;
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
            {`   ${rating} (${reviewNum})`}
          </p>
          <ul className="specialization">
            {specialization.map((spec) => (
              <li key={spec}>{spec}</li>
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

const ClinicDetailPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const clinicId = params.id;

  const clinic = useSelector((state) => state.clinics.clinic);
  const isLoading = useSelector((state) => state.clinics.isLoading);

  useEffect(() => {
    dispatch(clinicsActions.getClinic(clinicId));
  }, [dispatch]);

  return isLoading ? (
    <LoadingSpinner animation="border" color="success" />
  ) : (
    <div className="wrapper">
      <section className="clinic-showcase">
        {clinic ? <ClinicShowcase clinic={clinic} /> : null}
      </section>
      <section className="clinic-info"></section>
      <section className="clinic-doctors"></section>
      <section className="clinic-reviews"></section>
      <section className="clinic-map"></section>
    </div>
  );
};

export default ClinicDetailPage;
