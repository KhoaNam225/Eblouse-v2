import React, { useState } from "react";

const BookingSearchBar = ({
  clinicName,
  setClinicName,
  date,
  setDate,
  peopleNum,
  setPeopleNum,
  onSubmit,
}) => {
  return (
    <div className="search-box">
      <form onSubmit={onSubmit} className="search-form">
        <div
          id="location-input-box"
          className="search-component"
          onFocus={() => {
            const box = document.getElementById("location-input-box");
            box.classList.add("right-shadow-box");
          }}
          onBlur={() => {
            const box = document.getElementById("location-input-box");
            box.classList.remove("right-shadow-box");
          }}
        >
          <label>Location</label>
          <input type="text" value={clinicName} placeholder="Clinic name" />
        </div>
        <div className="split-bar"></div>
        <div
          id="date-input-box"
          className="search-component"
          onFocus={() => {
            const box = document.getElementById("date-input-box");
            box.classList.add("both-side-shadow-box");
          }}
          onBlur={() => {
            const box = document.getElementById("date-input-box");
            box.classList.remove("both-side-shadow-box");
          }}
        >
          <label>Date</label>
          <input type="date" value={date} style={{ color: "grey" }} />
        </div>
        <div className="split-bar"></div>
        <div
          id="num-people-input-box"
          className="box-with-search-btn"
          onFocus={() => {
            const box = document.getElementById("num-people-input-box");
            box.classList.add("left-shadow-box");
          }}
          onBlur={() => {
            const box = document.getElementById("num-people-input-box");
            box.classList.remove("left-shadow-box");
          }}
        >
          <div className="search-component">
            <label>Number of people</label>
            <input
              type="number"
              min={0}
              value={peopleNum}
              placeholder="How many people?"
            />
          </div>
          <button type="submit" className="submit-btn">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingSearchBar;
