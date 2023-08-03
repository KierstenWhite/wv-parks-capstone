import React, { useState } from "react";
import { Form, FormGroup } from "semantic-ui-react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../Managers/UserManager";

export default function Login({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login({email, password})
      .then((r) => {
        if(r){
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
        <FormGroup>
          <Form.Input id="email" label="Email" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Form.Input id="password" label="Password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Form.Button>Login</Form.Button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
    </Form>
  );
}