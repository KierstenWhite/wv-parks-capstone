import "semantic-ui-css/semantic.min.css";
import React, { useState } from "react";
import { Card, Image, Accordion, Icon } from "semantic-ui-react";
import './HistoricalSite.css'

export const HistoricalSiteList = ({ historicalSite }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  return (
    <>
      <Card
        id="individualHistoricalSiteCard"
        key={`HistoricalSite==${historicalSite.id}`}
      >
        <Image
          src={historicalSite.imageUrl}
          id="historicalSiteCardImage"
          alt="CardImage"
        />
        <Card.Content id="historicalSiteCardContent">
          <Card.Header id="historicalSiteCardHeader">
            {historicalSite.name}
          </Card.Header>
          {/* <Card.Description><strong>Park:</strong> {historicalSite.park.name}</Card.Description>
          <br></br> */}
          
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
            {historicalSite.description}
          </Accordion.Content>
          </Accordion>
          
        </Card.Content>
      </Card>
    </>
  );
};
