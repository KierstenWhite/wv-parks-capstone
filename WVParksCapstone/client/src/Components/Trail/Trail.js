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
        <Image id= "parkBannerImage" src="https://64.media.tumblr.com/95cc49ae541ad1ef2fc2dd79ae2f4426/0f5f72f0a90ee3ae-f7/s2048x3072/336ca098220ae40c40f6c50b80354e5d7d9c84d2.pnj" />
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
