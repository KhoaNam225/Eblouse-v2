import React, { useState } from "react";

const ReviewsSearchBar = ({ clinicName, setClinicName, onSubmit }) => {
  return (
    <div className="search-box">
      <form onSubmit={onSubmit} className="search-form">
        <div
          id="clinic-name-input-box"
          className="box-with-search-btn"
          onFocus={() => {
            const box = document.getElementById("clinic-name-input-box");
            box.classList.add("both-side-shadow-box");
          }}
          onBlur={() => {
            const box = document.getElementById("clinic-name-input-box");
            box.classList.remove("both-side-shadow-box");
          }}
        >
          <div className="search-component">
            <label>Clinic name</label>
            <input
              type="text"
              value={clinicName}
              placeholder="Enter clinic name here"
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

export default ReviewsSearchBar;
