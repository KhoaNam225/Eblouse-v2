import React from "react";

const SearchForm = () => {
  return (
    <div className="form">
      <div className="condition">
        <div className="search-input">
          <i className="locate-icon fas fa-map-marker-alt"></i>
          <input type="text" className="city" placeholder="your city" />
        </div>
        <div className="search-input">
          <i className="calender-icon fa fa-calendar"></i>
          <input
            type="text"
            className="date-display"
            placeholder="Nov 09, 2020"
          />
        </div>
        <div className="search-input">
          <i className="insurance-icon fa fa-address-card"></i>
          <input
            type="text"
            className="insurance"
            placeholder="Insurance carrier and plan"
          />
        </div>
        <button className="search-button">
          <i className="search-button fa fa-search"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
