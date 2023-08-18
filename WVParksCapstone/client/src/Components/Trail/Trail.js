//Parent for Parks
import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from "react";
import { TrailList } from './TrailList';
import { getAllTrails } from '../../Managers/TrailManager';
import { Card, Header, Segment, Image } from "semantic-ui-react";
import './Trail.css'

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
     <Segment id="bannerContainer">
        <Image id= "parkBannerImage" src="https://www.wv.gov/images/homebkg.jpg" />
      </Segment>
      <Header as="h2" id="trailListHeader">
        All WV State Parks Trails
      </Header>
      <Card.Group id="trailCardGroup" itemsPerRow={5}>
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
