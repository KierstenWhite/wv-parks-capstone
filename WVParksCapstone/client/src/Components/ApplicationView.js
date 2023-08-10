import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { UserProfile } from "./User/UserProfile";
import { Park } from "./Park/Park";
import { ParkProfile } from "./Park/ParkProfile";
import { AddReviewForm } from "./Review/AddReviewForm";
import { Review } from "./Review/Review";
import { MyReviews } from "./Review/MyReviews";
import { EditReviewForm } from "./Review/EditReviewForm";
import { Waterfall } from "./Waterfall/Waterfall";
import { Stay } from "./Stay/Stay";
import { Trail } from "./Trail/Trail";
import { HistoricalSite } from "./HistoricalSite/HistoricalSite";
import { Activities } from "./Activity/Activity";
import { AddTripForm } from "./Trip/AddTripForm";
import { Trip } from "./Trip/Trip";
import { EditTripForm } from "./Trip/EditTripForm";

export const ApplicationViews = () => {
//   const localUser = localStorage.getItem("userProfile")
//   const userObject = JSON.parse(localUser)

    return(
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myprofile" element={<UserProfile />} />
        <Route path="/parks" element={<Park />} />
        <Route path="/park/:id" element={<ParkProfile />} />
        <Route path="/addareview" element={<AddReviewForm />} />
        <Route path="/allreviews" element={<Review />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="/editmyreview/:reviewId" element={<EditReviewForm />} />
        <Route path="/waterfalls" element={<Waterfall />} />
        <Route path="/stays" element={ <Stay /> } />
        <Route path="/trails" element={ <Trail />} />
        <Route path="/historicalsites" element={ <HistoricalSite />} />
        <Route path="/activities" element={<Activities /> } />
        <Route path="/createatrip" element={< AddTripForm />} />
        <Route path="/editmytrip/:tripId" element={<EditTripForm /> } />
        <Route path="/mytrips" element={<Trip /> }/>
      </Routes>
    );
}
