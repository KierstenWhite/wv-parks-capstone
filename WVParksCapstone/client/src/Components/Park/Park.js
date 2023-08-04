//Parent for Parks
import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from "react";
import { ParkList } from './ParkList';
import { getAllParks } from "../../Managers/ParkManager";
import { Card, Header } from "semantic-ui-react";

export const Park = () => {
  const [parks, setParks] = useState([]);
  const localCurrentUser = localStorage.getItem("current_user");
  const currentUserObject = JSON.parse(localCurrentUser);

  useEffect(() => {
    getAllParks().then((parkArray) => {
      setParks(parkArray);
    });
  }, []);
  return (
    <>
      <Header as="h2" id="parkListHeader">
        All WV State Parks
      </Header>
      <Card.Group id="parkCardGroup" itemsPerRow={6}>
        {parks.map((park) => (
          <ParkList
            key={`park--${park.id}`}
            currentUser={currentUserObject}
            park={park}
          />
        ))}
      </Card.Group>
    </>
  );
};
