
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTripById, editMyTrip } from "../../Managers/TripManager";
import { getAllParks } from "../../Managers/ParkManager";
import { getAllStays } from "../../Managers/StayManager";
import { getAllHistoricalSites } from "../../Managers/HistoricalSite";
import { getAllTrails } from "../../Managers/TrailManager";
import { getAllWaterfalls } from "../../Managers/WaterfallManager";
import { getAllActivities } from "../../Managers/ActivityManager";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Divider,
  Form,
  Header,
  Input,
  Segment,
  TextArea,
} from "semantic-ui-react";

export const EditTripForm = () => {
 
    const [park, setParks] = useState([]);
    const [stay, setStays] = useState([]);
    const [historicalSite, setHistoricalSites] = useState([]);
    const [trail, setTrails] = useState([]);
    const [waterfall, setWaterfalls] = useState([]);
    const [activity, setActivities] = useState([]);

    const { tripId } = useParams();
    const navigate = useNavigate();
    const localCurrentUser = localStorage.getItem("userProfile");
    const currentUserObject = JSON.parse(localCurrentUser);
    const[trip, updateTrip] = useState({
      id: tripId,
      userId: currentUserObject.id,
      tripName: "",
      parkId: "",
      stayId: "",
      trailId: "",
      historicalSiteId: "",
      activityId: "",
      waterfallId: ""
  });
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

      useEffect(() => {
        getTripById(tripId).then((data) => {
            updateTrip(data);
        });
      }, [tripId]);

      const handleSaveButtonClick = (evt) => {
        evt.preventDefault();

        const tripToSendToAPI = {
          id: tripId,
          userId: currentUserObject.id,
          tripName: trip.tripName,
          parkId: trip.parkId,
          stayId: trip.stayId,
          trailId: trip.trailId,
          historicalSiteId: trip.historicalSiteId,
          activityId: trip.activityId,
          waterfallId: trip.waterfallId,
      };
    
        editMyTrip(tripToSendToAPI).then(() => {
          navigate("/mytrips");
        });
      };

      return (
        <>
            <Form id="createATripForm">
        <Header id="h2" as="h2">Edit My Trip</Header>
        
        <Form.Group widths="equal">
        <Form.Field
            control={Input}
            onChange={(evt) => {
              const copy = { ...trip };
              copy.tripName = evt.target.value;
              updateTrip(copy);
            }}
            label="Trip Name"
            htmlFor="tripName"
            placeholder="Blackwater Falls Weekend"
            value={trip.tripName}
            id="tripName"
          />
          </Form.Group>
          <Form.Group widths="equal">
          <Form.Select
            selection 
            onChange={(evt, data) => {
              const copy = { ...trip };
              copy.parkId = data.value;
              updateTrip(copy);
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
              updateTrip(copy);
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
              updateTrip(copy);
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
              updateTrip(copy);
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
              updateTrip(copy);
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
              updateTrip(copy);
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
                  id="button">Update Trip</Button>
      </Form>
        </>
      );
}