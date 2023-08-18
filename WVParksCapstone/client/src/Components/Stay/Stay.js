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
        <Image id= "parkBannerImage" src="https://wvstateparks.com/wp-content/uploads/2019/04/cropped-camping_wvsp.jpg" />
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
