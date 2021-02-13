import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

const BRCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel className="change-size" onSelect={handleSelect}>
      {images.map((image) => (
        <Carousel.Item>
          <img
            src={image}
            className="d-block w-100"
            style={{ borderRadius: "15px" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default BRCarousel;
