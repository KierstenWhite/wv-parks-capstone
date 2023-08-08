//Parent for Parks
import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from "react";
import { StayList } from './StayList';
import { getAllStays } from '../../Managers/StayManager';
import { Card, Header } from "semantic-ui-react";

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
      <Header as="h2" id="stayListHeader">
        All West Virginia State Parks Stay Options
      </Header>
      <Card.Group id="stayCardGroup" itemsPerRow={6}>
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
