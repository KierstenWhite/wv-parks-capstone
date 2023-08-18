import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addReview } from "../../Managers/ReviewManager";
import { getAllParks } from "../../Managers/ParkManager";
import { getAllStarTypes } from "../../Managers/StarTypeManager";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Form,
  Header,
  Input,
} from "semantic-ui-react";
import './Review.css'

export const AddReviewForm = () => {
  const [review, setReview] = useState({
    userId: "",
    parkId: "",
    starsId: "",
    reviewTitle: "",
    imageUrl: "",
    dateOfVisit: "",
  });
  const [park, setParks] = useState([]);
  const [star, setStars] = useState([]);

  const navigate = useNavigate();
  const localCurrentUser = localStorage.getItem("userProfile");
  const currentUserObject = JSON.parse(localCurrentUser);

  useEffect(() => {
    getAllParks().then((parkArray) => {
      setParks(parkArray);
    });
  }, []);

  useEffect(() => {
    getAllStarTypes().then((starArray) => {
      setStars(starArray);
    });
  }, []);

  const handleSaveButtonClick = (evt) => {
    evt.preventDefault();

    const reviewToSendToAPI = {
      userId: currentUserObject.id,
      parkId: review.parkId,
      starsId: review.starsId,
      reviewTitle: review.reviewTitle,
      imageUrl: review.imageUrl,
      dateOfVisit: review.dateOfVisit,
    };

    return addReview(reviewToSendToAPI).then(() => {
      navigate("/myreviews");
    });
  };

  return (
    <>
      <Form id="createAReviewForm">
        <Header id="h2" as="h2">Add a New Review</Header>
        <Form.Group widths="equal">
          <Form.Select
            selection
            onChange={(evt, data) => {
              const copy = { ...review };
              copy.parkId = data.value;
              setReview(copy);
            }}
            label="Select a Park"
            options={park.map((parkName) => ({
              key: parkName.id,
              value: parkName.id,
              text: parkName.name,
            }))}
            placeholder="Select a Park"
            value={review.parkId}
            required
          />
          <Form.Select
            selection
            onChange={(evt, data) => {
              const copy = { ...review };
              copy.starsId = data.value;
              setReview(copy);
            }}
            label="Rate the Park"
            options={star.map((starType) => ({
              key: starType.id,
              value: starType.id,
              text: starType.name,
            }))}
            placeholder="Rate the Park"
            value={review.starsId}
            required
          />
           </Form.Group>
          <Form.Group widths="equal">
          <Form.Field
            control={Input}
            onChange={(evt) => {
              const copy = { ...review };
              copy.reviewTitle = evt.target.value;
              setReview(copy);
            }}
            label="Leave a Short Review"
            htmlFor="reviewTitle"
            placeholder="Our visit was amazing!"
            id="reviewTitle"
          />
           </Form.Group>
          <Form.Group widths="equal">
          <Form.Field
            control={Input}
            onChange={(evt) => {
              const copy = { ...review };
              copy.imageUrl = evt.target.value;
              setReview(copy);
            }}
            label="Photo Link"
            htmlFor="imageUrl"
            placeholder="Photo Link"
            id="imageUrl"
          />
          <Form.Field
            control={Input}
            onChange={(evt) => {
              const copy = { ...review };
              copy.dateOfVisit = evt.target.value;
              setReview(copy);
            }}
            label="Date of Visit"
            type="date"
            htmlFor="dateOfVisit"
            id="dateOfVisit"
          />
        </Form.Group>
        <Button
          onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
          id="button"
        >
          Submit Review
        </Button>
      </Form>
    </>
  );
};
