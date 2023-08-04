import 'semantic-ui-css/semantic.min.css';
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getParkById } from '../../Managers/ParkManager';
import { Card, Image, Segment } from "semantic-ui-react"

export const ParkProfile = () => {
    const { id } = useParams();
    const [park, setPark] = useState({});

    useEffect(() => {
        getParkById(id).then(setPark);
    }, [id]);


    return (
        <>
        <Segment><Image
          src={park?.imageUrl}
          id="parkCardImage"
          alt="CardImage"
          size="large"
        /></Segment>
        <p>{park?.name} This is the park's profile page.</p></>
    )
}