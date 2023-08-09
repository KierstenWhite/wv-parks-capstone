
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Accordion, Button, Card, Icon, Image } from "semantic-ui-react";
import { deleteTrip } from '../../Managers/TripManager';

export const MyTripList = ({ trip, currentUser }) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const {tripId } = useParams();
  const navigate = useNavigate();

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  }

  const deleteButton = () => {
    return (
      <Button
        onClick={() => {
          deleteTrip(tripId).then(() => {
            navigate("/mytrips");
          });
        }}
      >
        Delete Trip
      </Button>
    );
  };

  return trip.userId === currentUser?.id ? (
    <>
      <Card
        id="individualTripCard"
        key={`trip--${trip.id}`}
        color="green"
      >
        <Card.Header id="tripCardHeader" as="h3">
          {trip.tripName}
        </Card.Header>
        <Card.Content id="tripCardContent">
          <Accordion fluid styled>
            
            <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}>
              <Icon name='dropdown'/>
              Park: {trip.park.name}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
            <Image src={trip.park.imageUrl} alt="CardImage" />
            {trip.park.address}<br />
            {trip.park.city}, {trip.park.state} {trip.park.zipcode}
            </Accordion.Content>

            <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}>
              <Icon name='dropdown'/>
              Stay: {trip.stay.name}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <Image src={trip.stay.imageUrl} alt="CardImage" />
              <strong>Number of Sites/Rooms:</strong> {trip.stay.numberOfSites} <br />
              {trip.stay.description}
            </Accordion.Content>

            <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={handleClick}>
              <Icon name='dropdown'/>
              Trail: {trip.trail.name}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
              <Image src={trip.trail.imageUrl} alt="CardImage" />
              <strong>Trail Difficulty:</strong> FIX <br />
              {trip.trail.description}
            </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 3}
            index={3}
            onClick={handleClick}>
              <Icon name='dropdown'/>
              Historical Site: {trip.historicalSite.name}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 3}>
              <Image src={trip.historicalSite.imageUrl} alt="CardImage" />
              {trip.historicalSite.description}
            </Accordion.Content>

            <Accordion.Title
            active={activeIndex === 4}
            index={4}
            onClick={handleClick}>
              <Icon name='dropdown'/>
              Activity: {trip.activity.name}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 4}>
              <Image src={trip.activity.imageUrl} alt="CardImage" />
              {trip.activity.description}
            </Accordion.Content>

            <Accordion.Title
            active={activeIndex === 5}
            index={5}
            onClick={handleClick}>
              <Icon name='dropdown'/>
              Waterfall: {trip.waterfall.name}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 5}>
              <Image src={trip.waterfall.imageUrl} alt="CardImage" />
              {trip.waterfall.description}
            </Accordion.Content>

            </Accordion>
          
        
          <Link to={`/editmytrip/${trip?.id}`}><Button>EDIT TRIP</Button></Link>
          {deleteButton()}
        </Card.Content>
      </Card>
    </>
  ) : (<></>)
};
