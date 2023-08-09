import 'semantic-ui-css/semantic.min.css';
import { Segment, Image, Button } from 'semantic-ui-react';
import "./Home.css";

export const Home = () => {
    return (
        <>
        <Segment id="stateParksLogoBanner">
            <Image id="logo" src="https://64.media.tumblr.com/194e94b1da50c7ddc6e51843d7eb9022/31ccb4df2ff58098-0b/s400x600/9fa798015203ef4cffac2840c3cdb61ed5ded0ea.pnj" />
            <br />
        </Segment>
        <Segment id="homeImageBanner">
            <Image id="bannerImage" src="https://virginiatraveltips.com/wp-content/uploads/2022/01/Best-national-parks-in-West-Virginia.jpg" />
            <Image id="bannerImage" src="https://i1.wp.com/www.alltherooms.com/blog/wp-content/uploads/2018/10/Feature-West-Virginia-State-Parks-By-Jon-Bilous.jpg?fit=1000%2C667&ssl=1" />
            <div id="homePageOverlay"></div>
            <p id="exploreText">EXPLORE WILD & WONDERFUL</p>
            <p id="westvirginiatext">WEST VIRGINIA</p>
            <Button size="huge" id="overlayButton">PLAN YOUR TRIP</Button>
        </Segment>
        </>
    )
}