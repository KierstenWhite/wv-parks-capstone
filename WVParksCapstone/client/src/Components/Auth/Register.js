import React, { useState } from "react";
import { Form, FormGroup, Header } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { register } from "../../Managers/UserManager";
import "semantic-ui-css/semantic.min.css";
import "./Register.css";

export default function Register({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [bio, setBio] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords do not match. Babydog would be disappointed.");
    } else {
      const userProfile = { email, username, userPhoto, isAdmin, bio };
      register(userProfile, password).then(() => {
        setIsLoggedIn(true);
        navigate("/");
      });
    }
  };

  return (
    <Form id="registerForm" size="large" onSubmit={registerClick}>
      <Header as="h1">Register</Header>
      <FormGroup widths="equal">
        <Form.Input
          id="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Input
          id="username"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Input
          id="userPhoto"
          label="User Photo"
          onChange={(e) => setUserPhoto(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Form.Checkbox
          id="isAdmin"
          label="Are you an admin?"
          onChange={(e) => setIsAdmin(e.target.value)}
        />
      </FormGroup>
      <FormGroup widths="equal">
        <Form.TextArea
          id="bio"
          label="Bio"
          onChange={(e) => setBio(e.target.value)}
        />
      </FormGroup>
      <FormGroup widths="equal">
        <Form.Input
          id="password"
          label="Create a Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Form.Button id="registerButton">Register</Form.Button>
      </FormGroup>
    </Form>
  );
}
