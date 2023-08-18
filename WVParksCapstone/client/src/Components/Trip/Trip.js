import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from "react";
import { MyTripList } from './MyTripList';
import { getAllTrips } from '../../Managers/TripManager';
import { Button, Card, Header, Segment } from "semantic-ui-react";
import "./Trip.css"
import { Link } from 'react-router-dom';

export const Trip = () => {
  const [trips, setTrips] = useState([]);
  const localCurrentUser = localStorage.getItem("userProfile");
  const currentUserObject = JSON.parse(localCurrentUser);

  useEffect(() => {
    getAllTrips().then((trip) => {
        setTrips(trip);
    });
  }, []);
  return (
    <div id="MyTripListContainer">
      <Segment id="myTripsSegment">
      <Header as="h2" id="h1">
       My Trips
      </Header>
      <Link to={`/createatrip`}><Button size='huge' id="createButton">Create a Trip</Button></Link>
      </Segment>
      <Card.Group id="tripCardGroup" itemsPerRow={3}>
        {trips.map((trip) => (
          <MyTripList
            key={`trip--${trip.id}`}
            currentUser={currentUserObject}
            trip={trip}
          />
        ))}
      </Card.Group>
    </div>
  );
};
