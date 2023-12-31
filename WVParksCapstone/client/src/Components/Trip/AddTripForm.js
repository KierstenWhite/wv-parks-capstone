import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addTrip } from "../../Managers/TripManager";
import { getAllParks } from "../../Managers/ParkManager";
import { getAllStays } from "../../Managers/StayManager";
import { getAllHistoricalSites } from "../../Managers/HistoricalSite";
import { getAllTrails } from "../../Managers/TrailManager";
import { getAllWaterfalls } from "../../Managers/WaterfallManager";
import { getAllActivities } from "../../Managers/ActivityManager";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Input,
  Segment,
  TextArea,
} from "semantic-ui-react";

export const AddTripForm = () => {
    const[trip, setTrips] = useState({
        userId: "",
        tripName: "",
        parkId: "",
        stayId: "",
        trailId: "",
        historicalSiteId: "",
        activityId: "",
        waterfallId: "",
    });
    const [park, setParks] = useState([]);
    const [stay, setStays] = useState([]);
    const [historicalSite, setHistoricalSites] = useState([]);
    const [trail, setTrails] = useState([]);
    const [waterfall, setWaterfalls] = useState([]);
    const [activity, setActivities] = useState([]);

    const navigate = useNavigate();
    const localCurrentUser = localStorage.getItem("userProfile");
    const currentUserObject = JSON.parse(localCurrentUser);

    useEffect(() => {
        getAllParks().then((parkArray) => {
          setParks(parkArray);
        });
      }, []);

      useEffect(() => {
        getAllStays().then((stayArray) => {
          setStays(stayArray);
        });
      }, []);

      useEffect(() => {
        getAllHistoricalSites().then((siteArray) => {
          setHistoricalSites(siteArray);
        });
      }, []);

      useEffect(() => {
        getAllTrails().then((trailArray) => {
          setTrails(trailArray);
        });
      }, []);

      useEffect(() => {
        getAllWaterfalls().then((waterfallArray) => {
          setWaterfalls(waterfallArray);
        });
      }, []);
    
      useEffect(() => {
        getAllActivities().then((Array) => {
          setActivities(Array);
        });
      }, []);

      const handleSaveButtonClick = (evt) => {
        evt.preventDefault();
    
        const tripToSendToAPI = {
            userId: currentUserObject.id,
            tripName: trip.tripName,
            parkId: trip.parkId,
            stayId: trip.stayId,
            trailId: trip.trailId,
            historicalSiteId: trip.historicalSiteId,
            activityId: trip.activityId,
            waterfallId: trip.waterfallId,
        };
    
        return addTrip(tripToSendToAPI).then(() => {
          navigate("/mytrips");
        });
      };

      return (
        <>
        <Segment id='tripFormHeader'>
          <Header id="h1" as='h1'>Plan Your Trip</Header>
          <p>Have an idea for your next adventure? Create a trip from the elements below.
            P.S. If you change your mind, you can always come back and edit it later.
          </p>
        </Segment>
            <Form id="createATripForm">
        <Header id="h2" as="h2">Create a New Trip</Header>
        {/* <Form.TextArea>To create a trip, you can select one of each type of item.</Form.TextArea> */}
        <Form.Group widths="equal">
        <Form.Field
            control={Input}
            onChange={(evt) => {
              const copy = { ...trip };
              copy.tripName = evt.target.value;
              setTrips(copy);
            }}
            label="Trip Name"
            htmlFor="tripName"
            placeholder="Blackwater Falls Weekend"
            id="tripName"
          />
          </Form.Group>
          <Form.Group widths="equal">
          <Form.Select
            selection 
            onChange={(evt, data) => {
              const copy = { ...trip };
              copy.parkId = data.value;
              setTrips(copy);
            }}
            label="Select a Park"
            options={park.map((parkName) => ({
              key: parkName.id,
              value: parkName.id,
              text: parkName.name,
            }))}
            placeholder="Select a Park"
            value={trip.parkId}
            required
          />
          <Form.Select
            selection
            onChange={(evt, data) => {
              const copy = { ...trip };
              copy.stayId = data.value;
              setTrips(copy);
            }}
            label="Select a Stay"
            options={stay.map((s) => ({
              key: s.id,
              value: s.id,
              text: `${s.name} (${s.park.name})`,
            }))}
            placeholder="Select a Stay"
            value={trip.stayId}
            required
          />

          <Form.Select
            selection
            onChange={(evt, data) => {
              const copy = { ...trip };
              copy.activityId = data.value;
              setTrips(copy);
            }}
            label="Select an Activity"
            options={activity.map((a) => ({
              key: a.id,
              value: a.id,
              text: `${a.name} (${a.park.name})`,
            }))}
            placeholder="Select an Activity"
            value={trip.activityId}
            required
          />
          </Form.Group>
          <Form.Group widths="equal">
          <Form.Select
            selection
            onChange={(evt, data) => {
              const copy = { ...trip };
              copy.historicalSiteId = data.value;
              setTrips(copy);
            }}
            label="Select a Historical Site or Museum"
            options={historicalSite.map((hs) => ({
              key: hs.id,
              value: hs.id,
              text: `${hs.name} (${hs.park.name})`,
            }))}
            placeholder="Select a Historical Site or Museum"
            value={trip.historicalSiteId}
            required
          />
          <Form.Select
            selection
            onChange={(evt, data) => {
              const copy = { ...trip };
              copy.trailId = data.value;
              setTrips(copy);
            }}
            label="Select a Trail"
            options={trail.map((t) => ({
              key: t.id,
              value: t.id,
              text: `${t.name} (${t.park.name})`,
            }))}
            placeholder="Select a Stay"
            value={trip.trailId}
            required
          />
          <Form.Select
            selection
            onChange={(evt, data) => {
              const copy = { ...trip };
              copy.waterfallId = data.value;
              setTrips(copy);
            }}
            label="Select a Waterfall"
            options={waterfall.map((w) => ({
              key: w.id,
              value: w.id,
              text: w.name,
            }))}
            placeholder="Select a Waterfall"
            value={trip.waterfallId}
            required
          />
        </Form.Group>
        <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                  id="button">Save Trip</Button>
      </Form>
        </>
      );
}