import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReviewById, editReview } from "../../Managers/ReviewManager";
import { getAllParks } from "../../Managers/ParkManager";
import { getAllStarTypes } from "../../Managers/StarTypeManager";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Form,
  Header,
  Input,
} from "semantic-ui-react";

export const EditReviewForm = () => {
  const [review, updateReview] = useState({
    userId: "",
    parkId: "",
    starsId: "",
    reviewTitle: "",
    imageUrl: "",
    dateOfVisit: "",
  });
  const [park, setParks] = useState([]);
  const [star, setStars] = useState([]);

  const { reviewId } = useParams();
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

  useEffect(() => {
    getReviewById(reviewId).then((data) => {
      updateReview(data);
    });
  }, [reviewId]);

  const handleSaveButtonClick = (evt) => {
    evt.preventDefault();

    editReview(review).then(() => {
      navigate(`/myreviews`);
    });
  };

  return (
    <>
      <Form>
        <Header as="h2">Add a New Review</Header>
        <Form.Group>
          <Form.Select
            selection
            onChange={(evt, data) => {
              const copy = { ...review };
              copy.parkId = data.value;
              updateReview(copy);
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
              updateReview(copy);
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
          <Form.Field
            control={Input}
            onChange={(evt) => {
              const copy = { ...review };
              copy.reviewTitle = evt.target.value;
              updateReview(copy);
            }}
            label="Leave a Short Review"
            htmlFor="reviewTitle"
            placeholder="Our visit was amazing!"
            value={review.reviewTitle}
            id="reviewTitle"
          />
          <Form.Field
            control={Input}
            onChange={(evt) => {
              const copy = { ...review };
              copy.imageUrl = evt.target.value;
              updateReview(copy);
            }}
            label="Photo Link"
            htmlFor="imageUrl"
            placeholder="Photo Link"
            value={review.imageUrl}
            id="imageUrl"
          />
          <Form.Field
            control={Input}
            onChange={(evt) => {
              const copy = { ...review };
              copy.dateOfVisit = evt.target.value;
              updateReview(copy);
            }}
            label="Date of Visit"
            type="date"
            htmlFor="dateOfVisit"
            value={review.dateOfVisit}
            id="dateOfVisit"
          />
        </Form.Group>
        <Button
          onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
          id="button"
        >
          Save
        </Button>
      </Form>
    </>
  );
};
