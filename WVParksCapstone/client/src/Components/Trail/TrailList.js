import 'semantic-ui-css/semantic.min.css';
import { Link } from "react-router-dom";
// import "./Park.css";
import { Button, Card, Image } from "semantic-ui-react";

export const TrailList = ({ trail, currentUser }) => {
  return (
    <>
      <Card
        id="individualStayCard"
        key={`Trail==${trail.id}`}
        color="green"
      >
        <Image
          src={trail.imageUrl}
          id="trailCardImage"
          alt="CardImage"
        />
        <Card.Content id="trailCardContent">
          <Card.Header id="trailCardHeader">
            {trail.name}
          </Card.Header>
          <Card.Description>
          Park: {trail.park.name}
          Trail Difficulty: {trail.trailDifficulty.name}
          </Card.Description>
          <br></br>
          <Card.Description id="trailCardDescription">
            {trail.description}
          </Card.Description>
        </Card.Content>
      </Card>
    </>
  )
};