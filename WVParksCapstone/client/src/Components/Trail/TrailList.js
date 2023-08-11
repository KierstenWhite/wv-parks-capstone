import React, { useState } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Link } from "react-router-dom";
// import "./Park.css";
import { Button, Card, Image, Accordion, Icon, AccordionAccordion } from "semantic-ui-react";
import './Trail.css'

export const TrailList = ({ trail, currentUser }) => {
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
        key={`Trail==${trail.id}`}
      >
        <Image
          src={trail.imageUrl}
          id="trailCardImage"
          alt="CardImage"
        />
        <Card.Content id="trailCardContent">
          <Card.Header id="trailCardHeader">
            {trail.name}
          </Card.Header>
          <Card.Description>
          <strong>Park:</strong> {trail.park.name}
          <strong>Trail Difficulty:</strong> {trail.trailDifficulty.name}
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
            {trail.description}
          </Accordion.Content>
          </Accordion>
        </Card.Content>
      </Card>
    </>
  )
};