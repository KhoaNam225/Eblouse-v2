import React from "react";
import Carousel, {
  slidesToShowPlugin,
  arrowsPlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import "../style/MultiItemsCarousel.css";

export const MultiItemsCarousel = ({ items }) => {
  const NavigationArrows = ({ direction }) => {
    const label =
      direction === "left" ? (
        <i className="fas fa-chevron-left"></i>
      ) : (
        <i className="fas fa-chevron-right"></i>
      );

    return <button className="carousel-button">{label}</button>;
  };
  return (
    <div className="carousel-wrapper">
      <Carousel
        offset={30}
        draggable={false}
        plugins={[
          "infinite",
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 3,
            },
          },
          {
            resolve: arrowsPlugin,
            options: {
              arrowLeft: <NavigationArrows direction={"left"} />,
              arrowRight: <NavigationArrows direction={"right"} />,
              addArrowClickHandler: true,
            },
          },
        ]}
      >
        {items}
      </Carousel>
    </div>
  );
};
