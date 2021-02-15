import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import HoverRating from "./HoverRating";
const ReviewForm = ({
  reviewText,
  rating,
  setRating,
  handleInputReviewChange,
  handleSubmitReview,
}) => {
  return (
    <Container fluid>
      <HoverRating rating={rating} setRating={setRating} />
      <Form onSubmit={handleSubmitReview}>
        <Form.Group as={Row}>
          <Form.Label htmlFor="review" column sm="2">
            Review:
          </Form.Label>
          <Col sm="8">
            <Form.Control
              id="review"
              type="text"
              value={reviewText}
              onChange={handleInputReviewChange}
            />
          </Col>

          <Button type="submit" disabled={!reviewText}>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
export default ReviewForm;
