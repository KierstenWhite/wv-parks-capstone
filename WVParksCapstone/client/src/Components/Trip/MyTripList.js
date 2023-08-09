import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Button, Card, Image } from "semantic-ui-react";

export const MyTripList = ({ trip, currentUser }) => {

  return trip.userId === currentUser.id ? (
    <>
      <Card
        id="individualTripCard"
        key={`trip--${trip.id}`}
        color="green"
      >
        <Card.Header id="tripCardHeader" as="h3">
          {trip.tripName}
        </Card.Header>
        <Card.Content id="tripCardContent">
          
          {/* <Card.Description as="h4">
            {trip.user.username} | Date of Visit: {trip.dateOfVisit} <br />
            Park Rating: {renderStarIcons()}
          </Card.Description>
          <Card.Description id="tripCardDescription">
            {trip.tripTitle}
          </Card.Description> */}
          <Link to={`/editmytrip/${trip?.id}`}><Button>Edit trip</Button></Link>
        </Card.Content>
      </Card>
    </>
  ) : (<></>)
};
