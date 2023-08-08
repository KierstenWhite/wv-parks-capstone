//Parent for Parks
import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from "react";
import { ActivityList } from './ActivityList';
import { getAllActivities } from '../../Managers/ActivityManager';
import { Card, Header } from "semantic-ui-react";

export const Activities = () => {
  const [activities, setActivities] = useState([]);
  const localCurrentUser = localStorage.getItem("current_user");
  const currentUserObject = JSON.parse(localCurrentUser);

  useEffect(() => {
    getAllActivities().then((activitiesArray) => {
      setActivities(activitiesArray);
    });
  }, []);
  return (
    <>
      <Header as="h2" id="activitiesListHeader">
        West Virginia State Parks - activitiess
      </Header>
      <Card.Group id="activitiesCardGroup" itemsPerRow={6}>
        {activities.map((activity) => (
          <ActivityList
            key={`activity--${activity.id}`}
            currentUser={currentUserObject}
            activity={activity}
          />
        ))}
      </Card.Group>
    </>
  );
};
