import { Link, useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Card, Image } from "semantic-ui-react";
import { DeleteReview } from "../../Managers/ReviewManager";
import './Review.css'

export const MyReviewsList = ({ review, currentUser }) => {
  const navigate = useNavigate();
  // Calculate the number of stars based on review.starType.value
  const numberOfStars = review.starType.value;

  // Function to render star icons
  const renderStarIcons = () => {
    const stars = [];
    for (let i = 0; i < numberOfStars; i++) {
      stars.push(<span key={`star-${i}`}>&#9733;</span>);
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return review.userId === currentUser.id ? (
    <>
      <Card id="individualReviewCard" key={`review--${review?.id}`}>
        <Card.Header id="reviewCardHeader" as="h3">
          {review.park.name}
        </Card.Header>
        <Image id="polaroid" width="100%" src={review.imageUrl} alt="CardImage" />
        <Card.Content id="reviewCardContent">
          <Card.Description as="h4" id="reviewCardDescriptionOne">
            {review.user.username} | {formatDate(review.dateOfVisit)} <br />
            Park Rating: {renderStarIcons()}
          </Card.Description>
          <Card.Description id="reviewCardDescription">
            {review.reviewTitle}
          </Card.Description>
          <Link to={`/editmyreview/${review?.id}`}>
            <Button id="cardEditButton">Edit Review</Button>
          </Link>
          <Button
          id="cardDeleteButton"
            color="red"
            onClick={() => {
              DeleteReview(review.id)
                .then(() => {
                  navigate("/myreviews");
                  window.location.reload();
                })
                .catch((error) => {
                  console.error("Error deleting review:", error);
                });
            }}
          >
            Delete Review
          </Button>
        </Card.Content>
      </Card>
    </>
  ) : (
    <></>
  );
};
