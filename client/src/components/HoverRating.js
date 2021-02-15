import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Good",
  4: "Great",
  5: "Excellent",
};

const useStyles = makeStyles({
  root: {
    width: 400,
    display: "flex",
    alignItems: "center",
  },
});

const HoverRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(-1);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={rating}
        precision={1}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {rating !== null && (
        <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>
      )}
    </div>
  );
};
export default HoverRating;
