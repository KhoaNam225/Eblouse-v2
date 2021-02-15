/**
 * Author: Khoa Nam Pham
 * File name: BookingSearchBar.js
 * Last Modified Date: 15/2/2021
 * Purpose:   This component is used to display the search bar inside the navigation bar.
 *            It will contains all the input form for user to search for clinics by specicializations.
 */

import React from "react";

/**
 * The Search Bar for user to search for clinics by specializations.
 *
 * @param {Object} date The date that the user wants to search for clinics by (currently not available)
 * @param {String} specQuery The string representing the specialization that the user uses to search for clinics
 * @param {Function} setSpecsQuery The function to change the value of specQuery
 * @param {EventHandler} onSubmit The Event handler to handle submitting the search input
 * @param {Array} specializations The array containing all available specializations in the app.
 */
const BookingSearchBar = ({
  date,
  specQuery,
  setSpecQuery,
  peopleNum,
  onSubmit,
  specializations,
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
          <label>Specializations</label>
          <select
            value={specQuery}
            placeholder="Specialization"
            onChange={(e) => {
              setSpecQuery(e.target.value);
            }}
          >
            <option value="" disabled selected>
              Choose a specialization
            </option>
            {specializations.map((spec) => (
              <option>{spec.name}</option>
            ))}
          </select>
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
