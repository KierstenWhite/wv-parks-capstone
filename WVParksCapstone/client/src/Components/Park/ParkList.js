import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";

export const ParkList = ({ park }) => {
  return (
    <>
      <Card id="individualParkCard" key={`Park==${park.id}`} color="green">
        <Image src={park.imageUrl} id="parkCardImage" alt="CardImage" />
        <Card.Content id="parkCardContent">
          <Card.Header id="parkCardHeader">{park.name}</Card.Header>
          <Card.Description id="parkCardDescription">
            {park.address}
            <br></br>
            {park.city}, {park.state} {park.zipcode}
          </Card.Description>
          <Link to={`/park/${park.id}`}>
            <Button id="parkCardProfileButton">Visit Park</Button>
          </Link>
        </Card.Content>
      </Card>
    </>
  );
};
