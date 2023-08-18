import "semantic-ui-css/semantic.min.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getParkById } from "../../Managers/ParkManager";
import { getAllStays } from "../../Managers/StayManager";
import { getAllHistoricalSites } from "../../Managers/HistoricalSite";
import { getAllTrails } from "../../Managers/TrailManager";
import { getAllActivities } from "../../Managers/ActivityManager";
import { Card, Image, Segment, Header, } from "semantic-ui-react";
import './Park.css'

export const ParkProfile = () => {
  const { id } = useParams();
  const [park, setPark] = useState({});
  const [stays, setStays] = useState([]);
  const [historicalSites, setHistoricalSites] = useState([]);
  const [trails, setTrails] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch park data
    getParkById(id).then(setPark);

    // Fetch and filter stays based on parkId
    getAllStays().then(allStays => {
      const matchingStays = allStays.filter(stay => stay.parkId === park.id);
      setStays(matchingStays);
    });

    // Fetch and filter historical sites based on parkId
    getAllHistoricalSites().then(allSites => {
      const matchingSites = allSites.filter(site => site.parkId === park.id);
      setHistoricalSites(matchingSites);
    });

    // Fetch and filter trails based on parkId
    getAllTrails().then(allTrails => {
      const matchingTrails = allTrails.filter(trail => trail.parkId === park.id);
      setTrails(matchingTrails);
    });

    // Fetch and filter activities based on parkId
    getAllActivities().then(allActivities => {
      const matchingActivities = allActivities.filter(activity => activity.parkId === park.id);
      setActivities(matchingActivities);
    });
  }, [id]);

  return (
    <>
      <Segment id="bannerContainer">
        <Image
          src={park.imageUrl}
          id="parkProfileCardImage"
          alt="CardImage"
          size="large"
        />
      </Segment>
      <Segment id="addressSegment">
        <Header id="h1" size="huge">{park.name}</Header>
        {park.address}
        <br></br>
        {park.city}, {park.state} {park.zipcode}
        {/*Star Average Will Go Here*/}
      </Segment>
      {/* Display Stays */}
      <Segment>
        <Header size="large">Stays</Header>
        <Card.Group>
          {stays.map(stay => (
            <Card key={stay.id}>
              <Card.Content>
                <Card.Header>{stay.name}</Card.Header>
                <Card.Description>{stay.description}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Segment>
      <Card.Group id="parkStays"></Card.Group>
      <Card.Group id="parkTrails"></Card.Group>
      <Card.Group id="parkHistoricalSites"></Card.Group>
      <Card.Group id="parkActivities"></Card.Group>
    </>
  );
};
