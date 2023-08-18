//Parent for Reviews
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import { ReviewList } from "./ReviewList";
import { getAllReviews } from "../../Managers/ReviewManager";
import { Card, Header, Segment } from "semantic-ui-react";
import './Review.css'

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
    <div id="MyReviewListContainer">
      <Segment id="myReviewsSegment">
      <Header as="h2" id="h1">
        All WV State Parks Reviews
      </Header>
      </Segment>
      <Card.Group id="reviewCardGroup" itemsPerRow={4}>
        {reviews.map((review) => (
          <ReviewList
            key={`review--${review.id}`}
            currentUser={currentUserObject}
            review={review}
          />
        ))}
      </Card.Group>
    </div>
  );
};
