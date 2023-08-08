//Parent for Parks
import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from "react";
import { WaterfallList } from './WaterfallList';
import { getAllWaterfalls } from '../../Managers/WaterfallManager';
import { Card, Header } from "semantic-ui-react";

export const Waterfall = () => {
  const [waterfalls, setWaterfalls] = useState([]);
  const localCurrentUser = localStorage.getItem("current_user");
  const currentUserObject = JSON.parse(localCurrentUser);

  useEffect(() => {
    getAllWaterfalls().then((waterfallArray) => {
      setWaterfalls(waterfallArray);
    });
  }, []);
  return (
    <>
      <Header as="h2" id="waterfallListHeader">
        West Virginia Waterfall Trail
      </Header>
      <Card.Group id="waterfallCardGroup" itemsPerRow={6}>
        {waterfalls.map((waterfall) => (
          <WaterfallList
            key={`waterfall--${waterfall.id}`}
            currentUser={currentUserObject}
            waterfall={waterfall}
          />
        ))}
      </Card.Group>
    </>
  );
};
