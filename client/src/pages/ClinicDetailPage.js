import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import clinicsActions from "../redux/actions/clinics.actions";
import LoadingSpinner from "../components/LoadingSpinner";

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
      <section className="clinic-images"></section>
      <section className="clinic-info"></section>
      <section className="clinic-doctors"></section>
      <section className="clinic-reviews"></section>
      <section className="clinic-map"></section>
    </div>
  );
};

export default ClinicDetailPage;
