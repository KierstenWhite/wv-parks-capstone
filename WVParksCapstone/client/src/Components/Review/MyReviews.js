import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import { MyReviewsList } from "./MyReviewList";
import { getAllReviews } from "../../Managers/ReviewManager";
import { Button, Card, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import './Review.css'

export const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const localCurrentUser = localStorage.getItem("userProfile");
  const currentUserObject = JSON.parse(localCurrentUser);

  console.log(currentUserObject);
  useEffect(() => {
    getAllReviews().then((reviewArray) => {
      setReviews(reviewArray);
    });
  }, []);
  return (
    <div id="MyReviewListContainer">
      <Segment id="myReviewsSegment">
      <Header as="h2" id="h1">
        My WV State Parks Reviews
      </Header>
      <Link to={`/addareview`}><Button size='huge' id="createButton">Add a Review</Button></Link>
      </Segment>
      <Card.Group id="reviewCardGroup" itemsPerRow={4}>
        {reviews.map((review) => (
          <MyReviewsList
            key={`review--${review.id}`}
            currentUser={currentUserObject}
            review={review}
          />
        ))}
      </Card.Group>
    </div>
  );
};
