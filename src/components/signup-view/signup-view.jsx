import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router";

import "./signup-view.scss";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default behavior (to reload the entire page) of the form

    const data = {
      username: username,
      password: password,
      email: email,
      birthDate: birthDate
    };

    fetch("https://movie-fetcher-5a8669cd2c54.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        alert("Singup successful!");
        navigate("/login");
      } else {
        alert("Signup failed.");
      }
    });
  };

  // onSubmit tells the login API to validate username, password, email, and birthDate
  return (
    <Row>
      <Col className="mt-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 mt-4" controlId="formUsername">
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
          <Form.Group className="mb-3" controlId="formPassword">
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
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address:</Form.Label>
            <Form.Control 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBirthDate">
            <Form.Label>Date of birth:</Form.Label>
            <Form.Control 
              type="date" 
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)} 
              required
            />
          </Form.Group>
          <Button className="submit-btn" type="submit">Submit</Button>
        </Form>
      </Col>
    </Row>
  )
};

SignupView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthDate: PropTypes.instanceOf(Date),
  }).isRequired
};