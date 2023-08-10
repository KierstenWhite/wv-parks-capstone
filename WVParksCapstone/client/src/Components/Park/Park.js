//Parent for Parks
import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import { ParkList } from "./ParkList";
import { getAllParks } from "../../Managers/ParkManager";
import { Card, Header, Image, Segment } from "semantic-ui-react";
import './Park.css'

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
      <Segment id="bannerContainer">
        <Image id= "parkBannerImage" src="https://64.media.tumblr.com/95cc49ae541ad1ef2fc2dd79ae2f4426/0f5f72f0a90ee3ae-f7/s2048x3072/336ca098220ae40c40f6c50b80354e5d7d9c84d2.pnj" />
      </Segment>
      <Header as="h2" id="parkListHeader">
        All WV State Parks
      </Header>
      <Card.Group id="parkCardGroup" itemsPerRow={5}>
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
