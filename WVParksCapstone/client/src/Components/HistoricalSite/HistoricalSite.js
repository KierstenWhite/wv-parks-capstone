import "semantic-ui-css/semantic.min.css";
import { useState, useEffect } from "react";
import { HistoricalSiteList } from "./HistoricalSiteList";
import { getAllHistoricalSites } from "../../Managers/HistoricalSite";
import { Card, Header, Segment, Image } from "semantic-ui-react";
import './HistoricalSite.css'

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
    <Segment id="bannerContainer">
        <Image id= "parkBannerImage" src="https://64.media.tumblr.com/95cc49ae541ad1ef2fc2dd79ae2f4426/0f5f72f0a90ee3ae-f7/s2048x3072/336ca098220ae40c40f6c50b80354e5d7d9c84d2.pnj" />
      </Segment>
      <Header as="h2" id="historicalSiteListHeader">
      All WV State Parks Historical Sites
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
