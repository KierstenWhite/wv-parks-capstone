import "semantic-ui-css/semantic.min.css";
import { Card, Image } from "semantic-ui-react";

export const ActivityList = ({ activity }) => {
  return (
    <>
      <Card
        id="individualStayCard"
        key={`Activity==${activity.id}`}
        color="green"
      >
        <Image src={activity.imageUrl} id="activityCardImage" alt="CardImage" />
        <Card.Content id="activityCardContent">
          <Card.Header id="activityCardHeader">{activity.name}</Card.Header>
          <Card.Description>
            Park: {activity.park.name}
            Activity Type: {activity.activityType.name}
          </Card.Description>
          <br></br>
          <Card.Description id="activityCardDescription">
            {activity.description}
          </Card.Description>
        </Card.Content>
      </Card>
    </>
  );
};
