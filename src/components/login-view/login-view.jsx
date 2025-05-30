import React, { useState } from "react";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./login-view.scss";

export const LoginView = ({onLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default behavior (to reload the entire page) of the form

    const data = {
      username: username,
      password: password
    };

    // To call the "onLoggedIn" prop when the login requiest succeeds
    fetch("https://movie-fetcher-5a8669cd2c54.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json()) // Transforms the response content into a JSON object that code can use to extract the JWT sent by MovieFetcher API
    .then((data) => {
      // console.log("Login response: ", data);
      if (data.user) {
        // After successful login, the user object and token will be  stored using localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("User not found.");
      }
    })
    .catch((e) => {
      alert("Something went wrong.");
    });
  }

  // onSubmit tells the login API to validate username & password
  return (
    <Row>
      <Col className="mt-5">
        <Form className="mb-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control 
              type="text" 
              value={username} 
              minLength="3" 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username"
              required
            />
            <Form.Text>Your username must contain at least 5 characters.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control 
              type="password" 
              value={password}
              minLength="8"
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
              required
            />
            <Form.Text>Your password must contain at least 8 characters.</Form.Text>
          </Form.Group>
          <Button className="submit-btn mb-4" type="submit">Submit</Button>
        </Form>
      </Col>
    </Row>
  )
};

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthDate: PropTypes.instanceOf(Date),
  }).isRequired
};