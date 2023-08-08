import 'semantic-ui-css/semantic.min.css';
import { Link } from "react-router-dom";
// import "./Park.css";
import { Button, Card, Image } from "semantic-ui-react";

export const HistoricalSiteList = ({ historicalSite, currentUser }) => {
  return (
    <>
      <Card
        id="individualHistoricalSiteCard"
        key={`HistoricalSite==${historicalSite.id}`}
        color="green"
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
          <Card.Description>
          Park: {historicalSite.park.name}
          </Card.Description>
          <br></br>
          <Card.Description id="historicalSiteCardDescription">
            {historicalSite.description}
          </Card.Description>
        </Card.Content>
      </Card>
    </>
  )
};