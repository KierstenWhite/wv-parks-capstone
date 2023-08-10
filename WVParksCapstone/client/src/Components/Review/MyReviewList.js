import { Link, useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Button, Card, Image } from "semantic-ui-react";
import { DeleteReview } from '../../Managers/ReviewManager';

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

  return review.userId === currentUser.id ? (
    <>
      <Card
        id="individualParkCard"
        key={`review--${review?.id}`}
        color="green"
      >
        <Card.Header id="reviewCardHeader" as="h3">
          {review.park.name}
        </Card.Header>
        <Image src={review.imageUrl} id="reviewCardImage" alt="CardImage" />
        <Card.Content id="reviewCardContent">
          <Card.Description as="h4">
            {review.user.username} | Date of Visit: {review.dateOfVisit} <br />
            Park Rating: {renderStarIcons()}
          </Card.Description>
          <Card.Description id="reviewCardDescription">
            {review.reviewTitle}
          </Card.Description>
          <Link to={`/editmyreview/${review?.id}`}><Button>Edit Review</Button></Link>
          <Button
    color="red"
    onClick={() => {
      DeleteReview(review.id)
        .then(() => {
          navigate('/myreviews')
          // Add logic here to update the state and remove the deleted review from the list
        })
        .catch((error) => {
          console.error('Error deleting review:', error);
        });
    }}
  >
    Delete Review
  </Button>
        </Card.Content>
      </Card>
    </>
  ) : (<></>)
};
