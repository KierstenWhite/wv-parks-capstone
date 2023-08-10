import "semantic-ui-css/semantic.min.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getParkById } from "../../Managers/ParkManager";
import { Card, Image, Segment, Header } from "semantic-ui-react";

export const ParkProfile = () => {
  const { id } = useParams();
  const [park, setPark] = useState({});

  useEffect(() => {
    getParkById(id).then(setPark);
  }, [id]);

  return (
    <>
      <Segment>
        <Image
          src={park.imageUrl}
          id="parkCardImage"
          alt="CardImage"
          size="large"
        />
      </Segment>
      <Segment>
        <Header size="huge">{park.name}</Header>
        {park.address}
        <br></br>
        {park.city}, {park.state} {park.zipcode}
        {/*Star Average Will Go Here*/}
      </Segment>
      <Card.Group id="parkStays"></Card.Group>
      <Card.Group id="parkTrails"></Card.Group>
      <Card.Group id="parkHistoricalSites"></Card.Group>
      <Card.Group id="parkActivities"></Card.Group>
    </>
  );
};
