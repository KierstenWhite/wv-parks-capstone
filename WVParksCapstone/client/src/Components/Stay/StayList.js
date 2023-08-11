import 'semantic-ui-css/semantic.min.css';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, Button, Card, Image, Icon } from "semantic-ui-react";
import './Stay.css'

export const StayList = ({ stay, currentUser }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  return (
    <>
      <Card
        id="individualStayCard"
        key={`Stay=${stay.id}`}
      >
        <Image
          src={stay.imageUrl}
          id="stayCardImage"
          alt="CardImage"
        />
        <Card.Content id="stayCardContent">
          <Card.Header id="stayCardHeader">
            {stay.name}
          </Card.Header>
          <Card.Description id="stayCardDescription">
          <strong>Park:</strong> {stay.park.name}<br />
          <strong>Stay Type:</strong> {stay.stayType.type}<br />
          <strong>Number of Sites/Rooms:</strong> {stay.numberOfSites}
          </Card.Description>
          {/* <br></br> */}
          <Accordion>
          <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={handleClick}
            >
              <Icon id="dropdownArrow" name="dropdown" />
              <strong id="descriptionDropdown">Description</strong>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
            {stay.description}
          </Accordion.Content>
          </Accordion>
        </Card.Content>
      </Card>
    </>
  )
};