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
        <Image id= "parkBannerImage" src="https://cdn11.bigcommerce.com/s-db59p/images/stencil/1280x1280/products/25448/74924/WV_StatePark_12172020_03__10105.1670034715.jpg?c=2" />
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
