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
        <Image id= "parkBannerImage" src="https://wvstateparks.com/wp-content/uploads/2019/04/Lost-River-State-park-4-25-19.jpg" />
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
