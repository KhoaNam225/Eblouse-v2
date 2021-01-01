import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ animation, color }) => {
  const spinnerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div className="spinner-wrapper" style={spinnerStyle}>
      <Spinner animation={animation} variant={color} />
    </div>
  );
};

export default LoadingSpinner;
