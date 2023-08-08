//Parent for Parks
import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from "react";
import { TrailList } from './TrailList';
import { getAllTrails } from '../../Managers/TrailManager';
import { Card, Header } from "semantic-ui-react";

export const Trail = () => {
  const [trails, setTrails] = useState([]);
  const localCurrentUser = localStorage.getItem("current_user");
  const currentUserObject = JSON.parse(localCurrentUser);

  useEffect(() => {
    getAllTrails().then((trailArray) => {
      setTrails(trailArray);
    });
  }, []);
  return (
    <>
      <Header as="h2" id="trailListHeader">
        West Virginia State Parks - Trails
      </Header>
      <Card.Group id="trailCardGroup" itemsPerRow={6}>
        {trails.map((trail) => (
          <TrailList
            key={`trail--${trail.id}`}
            currentUser={currentUserObject}
            trail={trail}
          />
        ))}
      </Card.Group>
    </>
  );
};
