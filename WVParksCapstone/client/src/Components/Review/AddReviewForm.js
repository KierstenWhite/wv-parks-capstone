import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addReview } from "../../Managers/ReviewManager";
import { getAllParks } from "../../Managers/ParkManager";
import { getAllStarTypes } from "../../Managers/StarTypeManager";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Divider,
  Form,
  Header,
  Input,
  Segment,
  TextArea,
} from "semantic-ui-react";

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

  const handleSaveButtonClick = (e) => {
    e.preventDefault();

    const reviewToSendToAPI = {
      userId: currentUserObject.id,
      parkId: review.parkId,
      starsId: review.starsId,
      reviewTitle: review.reviewTitle,
      imageUrl: review.imageUrl,
      dateOfVisit: review.dateOfVisit,
    };

    return addReview(reviewToSendToAPI).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <Form>
        <Header as="h2">Add a New Review</Header>
        <Form.Group>
          <Form.Select
            selection // Enable selection mode
            onChange={(event, data) => {
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
            selection // Enable selection mode
            onChange={(event, data) => {
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
      </Form>
    </>
  );
};
