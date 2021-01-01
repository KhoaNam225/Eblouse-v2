import React from "react";

const SearchForm = () => {
  return (
    <div className="form">
      <div className="condition">
        <div class="search-input">
          <i class="locate-icon fas fa-map-marker-alt"></i>
          <input type="text" class="city" placeholder="your city" />
        </div>
        <div class="search-input">
          <i class="calender-icon fa fa-calendar"></i>
          <input type="text" class="date-display" placeholder="Nov 09, 2020" />
        </div>
        <div class="search-input">
          <i class="insurance-icon fa fa-address-card"></i>
          <input
            type="text"
            class="insurance"
            placeholder="Insurance carrier and plan"
          />
        </div>
        <button class="search-button">
          <i class="search-button fa fa-search"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
