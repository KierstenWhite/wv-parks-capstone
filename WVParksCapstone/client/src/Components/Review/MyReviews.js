import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from "react";
import { MyReviewsList } from './MyReviewList';
import { getAllReviews } from '../../Managers/ReviewManager';
import { Card, Header } from "semantic-ui-react";

export const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const localCurrentUser = localStorage.getItem("userProfile");
  const currentUserObject = JSON.parse(localCurrentUser);

  console.log(currentUserObject)
  useEffect(() => {
    getAllReviews().then((reviewArray) => {
        setReviews(reviewArray);
    });
  }, []);
  return (
    <>
      <Header as="h2" id="reviewListHeader">
       My WV State Parks Reviews
      </Header>
      <Card.Group id="reviewCardGroup" itemsPerRow={4}>
        {reviews.map((review) => (
          <MyReviewsList
            key={`review--${review.id}`}
            currentUser={currentUserObject}
            review={review}
          />
        ))}
      </Card.Group>
    </>
  );
};
