import 'semantic-ui-css/semantic.min.css';
import { Link } from "react-router-dom";
// import "./Park.css";
import { Button, Card, Image } from "semantic-ui-react";

export const StayList = ({ stay, currentUser }) => {
  return (
    <>
      <Card
        id="individualStayCard"
        key={`Stay=${stay.id}`}
        color="green"
      >
        <Image
          src={stay.imageUrl}
          id="stayCardImage"
          alt="CardImage"
        />
        <Card.Content id="stayCardContent">
          <Card.Header id="stayCardHeader">
            {stay.name}
          </Card.Header>
          <Card.Description>
          Park: {stay.park.name}
          Stay Type: {stay.stayType.type}
          </Card.Description>
          <br></br>
          <Card.Description id="stayCardDescription">
            {stay.description}
          </Card.Description>
        </Card.Content>
      </Card>
    </>
  )
};