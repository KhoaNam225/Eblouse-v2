import React, { useState } from "react";

const ControlledCarousel = ({ sliderWidth, sliderHeight }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [left, setLeft] = useState(0);
  const [slider, setSlider] = useState(["one", "two", "three", "four"]);
  const prevSlide = () => {
    setActiveIndex(activeIndex - 1);
    setLeft(left + sliderWidth);
    if (activeIndex === 1) {
      setActiveIndex(activeIndex + (slider.length - 1));
      setLeft(left - sliderWidth * (slider.length - 1));
    }
  };
  const nextSlide = () => {
    setActiveIndex(activeIndex + 1);
    setLeft(left - sliderWidth);
    if (activeIndex === slider.length) {
      setActiveIndex(activeIndex - slider.length + 1);
      setLeft(0);
    }
  };
  const clickIndicator = (e) => {
    setActiveIndex(parseInt(e.target.textContext));
    setLeft(sliderWidth - parseInt(e.target.textContext) * sliderWidth);
  };

  return (
    <div>
      <div className="slider-wrapper">
        <ul className="slider">
          {slider.map((item, index) => {
            return (
              <li
                style={{ left: left, width: sliderWidth, height: sliderHeight }}
                className={index + 1 === activeIndex ? "slider-item" : "hide"}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="buttons-wrapper">
        <button className="prev-button" onClick={prevSlide}></button>
        <button className="next-button" onClick={nextSlide}></button>
      </div>
      <div className="indicators-wrapper">
        <ul className="indicators">
          {slider.map((item, index) => {
            return (
              <li
                className={index + 1 === activeIndex ? "active-indicator" : ""}
                onClick={clickIndicator}
              >
                {index + 1}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ControlledCarousel;
