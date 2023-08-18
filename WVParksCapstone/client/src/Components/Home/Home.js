import "semantic-ui-css/semantic.min.css";
import { Segment, Image, Button, Header } from "semantic-ui-react";
import "./Home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      {/* <Segment id="stateParksLogoBanner">
        <Image
          id="logo"
          src="https://64.media.tumblr.com/194e94b1da50c7ddc6e51843d7eb9022/31ccb4df2ff58098-0b/s400x600/9fa798015203ef4cffac2840c3cdb61ed5ded0ea.pnj"
        />
        <br />
      </Segment> */}
      <Segment id="homeImageBanner">
        {/* <Image
          id="bannerImage"
          src="https://virginiatraveltips.com/wp-content/uploads/2022/01/Best-national-parks-in-West-Virginia.jpg"
        /> */}
        <Image
          id="bannerImage"
          src="https://www.wv.gov/images/homebkg.jpg"
        />
        <div id="homePageOverlay"></div>
        <p id="exploreText">EXPLORE WILD & WONDERFUL</p>
        <p id="westvirginiatext">WEST VIRGINIA</p>
        <Link to="/createatrip">
          <Button size="huge" id="overlayButton">
            PLAN YOUR TRIP
          </Button>
        </Link>
      </Segment>
      <Segment id="homePageInfoSegment">
        <Segment id="segmentOne">
        <Header id="homePageInfoSegmentHeader">DISCOVER YOUR PERFECT ADVENTURE WITH RHODODENDRON GUIDE.</Header>
        <p id="homePageInfoSegmentBody">We believe in helping you plan the trip you need in the moment. Whether you're looking for an activity filled, week-long vacation for the family or a solo hiking trip to find yourself, we're here for you.</p>
        </Segment>
        <Segment id="segmentTwo">
        <Image id="quadImage" src="https://64.media.tumblr.com/f848743e90e9e17a3a50b94bb4646ff8/1320465f346f5ef9-b3/s500x750/b0d1cbeb44f7ea4bfb68202c951861f6d545156c.pnj" />
        </Segment>
      </Segment>
    </>
  );
};
