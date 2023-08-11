//Parent for Parks
import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from "react";
import { StayList } from './StayList';
import { getAllStays } from '../../Managers/StayManager';
import { Card, Header, Segment, Image } from "semantic-ui-react";
import './Stay.css'

export const Stay = () => {
  const [stays, setStays] = useState([]);
  const localCurrentUser = localStorage.getItem("current_user");
  const currentUserObject = JSON.parse(localCurrentUser);

  useEffect(() => {
    getAllStays().then((stayArray) => {
      setStays(stayArray);
    });
  }, []);
  return (
    <>
    <Segment id="bannerContainer">
        <Image id= "parkBannerImage" src="https://64.media.tumblr.com/95cc49ae541ad1ef2fc2dd79ae2f4426/0f5f72f0a90ee3ae-f7/s2048x3072/336ca098220ae40c40f6c50b80354e5d7d9c84d2.pnj" />
      </Segment>
      <Header as="h2" id="stayListHeader">
        All WV State Parks Stay Options
      </Header>
      <Card.Group id="stayCardGroup" itemsPerRow={4}>
        {stays.map((stay) => (
          <StayList
            key={`stay--${stay.id}`}
            currentUser={currentUserObject}
            stay={stay}
          />
        ))}
      </Card.Group>
    </>
  );
};
