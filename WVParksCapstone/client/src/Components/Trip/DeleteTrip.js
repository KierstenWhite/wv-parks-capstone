import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTrip } from "../../Managers/TripManager";
import "semantic-ui-css/semantic.min.css";
import {
  Button
} from "semantic-ui-react";

export const DeleteTrip = () => {
  const {tripId } = useParams();
  const navigate = useNavigate();

  const deleteButton = () => {
    return (
      <Button
        onClick={() => {
          deleteTrip(tripId).then(() => {
            navigate("/mytrips");
          });
        }}
      >
        Delete Trip
      </Button>
    );
  };
}