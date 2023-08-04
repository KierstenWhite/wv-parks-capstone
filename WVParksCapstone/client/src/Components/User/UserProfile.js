// import React, { useState, useEffect } from "react";
import { useEffect, useState } from "react";
import { getUserAndReplace, getCurrentUser } from "../../Managers/UserManager";
import 'semantic-ui-css/semantic.min.css';
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
    const [user, editUser] = useState({
        email: "",
        username: "",
        userPhoto: "",
        isAdmin: "",
        bio: "",
        dateCreated: "",
        userId: 0,
    })

    const localCurrentUser = localStorage.getItem("userProfile");
    const currentUserObject = JSON.parse(localCurrentUser);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser(currentUserObject).then((data) => {
            const userObject = data[0];
            editUser(userObject);
        });
    }, []);

    const handleSaveButtonClick = (e) => {
        e.preventDefault();

        getUserAndReplace(user).then(() => {
            navigate("/myprofile");
        });
    };

    return (<>
    <p> {user.username} It's a profile page.</p></>)
}
