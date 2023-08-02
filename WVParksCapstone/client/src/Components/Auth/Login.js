import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Managers/UserProfileManager";

export default function Login({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login({email, password})
      .then((r) => {
        //0 = Inactive account; 1 = Active Account
        //If the account has been deactivated, users will be prevented from logging in and receive the window alert.
        if (r.isActive === 0){
          setIsLoggedIn(false);
          alert("Your account has been deactivated by an administrator. Please contact us to reactivate your account.")
        }
      else if(r){
      setIsLoggedIn(true)
      navigate('/')
      } 
      else{
        alert("Invalid email or password")
      }
    })
  };

  return (
    <Form onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </Form>
  );
}