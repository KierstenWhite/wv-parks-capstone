import 'semantic-ui-css/semantic.min.css';
import { Card, Image } from "semantic-ui-react";
import './Review.css'

export const ReviewList = ({ review, currentUser }) => {
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

  return (
    <>
      <Card
        id="individualReviewCardAll"
        key={`review--${review.id}`}
        
      >
        <Card.Header id="reviewCardHeader" as="h3">
          {review.park.name}
        </Card.Header>
        <Image id="polaroid" width="100%" src={review.imageUrl} alt="CardImage" />
        <Card.Content id="reviewCardContent">
          <Card.Description as="h4">
            {review.user.username} | {formatDate(review.dateOfVisit)} <br />
            Park Rating: {renderStarIcons()}
          </Card.Description>
          <Card.Description id="reviewCardDescription">
            {review.reviewTitle}
          </Card.Description>
        </Card.Content>
      </Card>
    </>
  );
};
