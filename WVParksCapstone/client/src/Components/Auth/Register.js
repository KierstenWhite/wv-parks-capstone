import React, { useState} from "react";
import { Form, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { register } from "../Managers/UserProfileManager";


export default function Register({setIsLoggedIn}) {
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
      register(userProfile, password)
        .then(() => {
          setIsLoggedIn(true)
          navigate('/')
        });
    }
 };

  return (
    <Form onSubmit={registerClick}>
        
        <FormGroup>
          <Form.Input id="username" label="Username" onChange={e => setUsername(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Form.Input id="userPhoto" label="User Photo" onChange={e => setUserPhoto(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Form.Checkbox id="isAdmin" label="Are you an admin?" onChange={e => setIsAdmin(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Form.Input id="bio" label="Bio" onChange={e => setBio(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Form.Input id="email" label="Email" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Form.Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Form.Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
    </Form>
  );
}