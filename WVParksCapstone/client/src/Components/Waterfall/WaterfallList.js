import 'semantic-ui-css/semantic.min.css';
import { Link } from "react-router-dom";
// import "./Park.css";
import { Button, Card, Image } from "semantic-ui-react";

export const WaterfallList = ({ waterfall, currentUser }) => {
  return (
    <>
      <Card
        id="individualStayCard"
        key={`Waterfall==${waterfall.id}`}
        color="green"
      >
        <Image
          src={waterfall.imageUrl}
          id="waterfallCardImage"
          alt="CardImage"
        />
        <Card.Content id="waterfallCardContent">
          <Card.Header id="waterfallCardHeader">
            {waterfall.name}
          </Card.Header>
          <Card.Description>
          Region: {waterfall.region.name}
          </Card.Description>
          <br></br>
          <Card.Description id="waterfallCardDescription">
            {waterfall.description}
          </Card.Description>
        </Card.Content>
      </Card>
    </>
  )
};