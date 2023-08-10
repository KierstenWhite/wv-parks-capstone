//Parent for Reviews
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import { ReviewList } from "./ReviewList";
import { getAllReviews } from "../../Managers/ReviewManager";
import { Card, Header } from "semantic-ui-react";

export const Review = () => {
  const [reviews, setReviews] = useState([]);
  const localCurrentUser = localStorage.getItem("current_user");
  const currentUserObject = JSON.parse(localCurrentUser);

  useEffect(() => {
    getAllReviews().then((reviewArray) => {
      setReviews(reviewArray);
    });
  }, []);
  return (
    <>
      <Header as="h2" id="reviewListHeader">
        All WV State Parks Reviews
      </Header>
      <Card.Group id="reviewCardGroup" itemsPerRow={4}>
        {reviews.map((review) => (
          <ReviewList
            key={`review--${review.id}`}
            currentUser={currentUserObject}
            review={review}
          />
        ))}
      </Card.Group>
    </>
  );
};
