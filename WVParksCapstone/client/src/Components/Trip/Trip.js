import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from "react";
import { MyTripList } from './MyTripList';
import { getAllTrips } from '../../Managers/TripManager';
import { Card, Header } from "semantic-ui-react";

export const Trip = () => {
  const [trips, setTrips] = useState([]);
  const localCurrentUser = localStorage.getItem("current_user");
  const currentUserObject = JSON.parse(localCurrentUser);

  useEffect(() => {
    getAllTrips().then((trip) => {
        setTrips(trip);
    });
  }, []);
  return (
    <>
      <Header as="h2" id="tripListHeader">
       My Trips
      </Header>
      <Card.Group id="tripCardGroup" itemsPerRow={4}>
        {trips.map((trip) => (
          <MyTripList
            key={`trip--${trip.id}`}
            currentUser={currentUserObject}
            trip={trip}
          />
        ))}
      </Card.Group>
    </>
  );
};
