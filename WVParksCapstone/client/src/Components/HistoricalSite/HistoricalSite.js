import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import { HistoricalSiteList } from "./HistoricalSiteList";
import { getAllHistoricalSites } from "../../Managers/HistoricalSite";
import { Card, Header } from "semantic-ui-react";

export const HistoricalSite = () => {
  const [historicalSites, setHistoricalSites] = useState([]);
  const localCurrentUser = localStorage.getItem("current_user");
  const currentUserObject = JSON.parse(localCurrentUser);

  useEffect(() => {
    getAllHistoricalSites().then((historicalSiteArray) => {
      setHistoricalSites(historicalSiteArray);
    });
  }, []);
  return (
    <>
      <Header as="h2" id="historicalSiteListHeader">
        West Virginia State Parks - Historical Sites
      </Header>
      <Card.Group id="historicalSiteCardGroup" itemsPerRow={4}>
        {historicalSites.map((historicalSite) => (
          <HistoricalSiteList
            key={`historicalSite--${historicalSite.id}`}
            currentUser={currentUserObject}
            historicalSite={historicalSite}
          />
        ))}
      </Card.Group>
    </>
  );
};
