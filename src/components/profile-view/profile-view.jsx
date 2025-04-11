import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router";

import "./profile-view.scss";

export const ProfileView = ({ user, token , setUser, movies }) => {
  const [ IsEditing, setIsEditing ] = useState(false);
  const [ userForm, setUserForm ] = useState(user || {}); // If the user is truthy (exists), if it's falsy (null or undefined) then it deafults to an empty object {}.
  const [ favoriteMovies, setFavoriteMovies ] = useState([]);
  const navigate = useNavigate();
  const { username } = useParams();
  

  // Handle input changes
  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserForm({
      ...userForm,
      [name]: value
    });
  };

  // Fetching user's data
  useEffect(() => {
    if (!user || !movies?.length || !token) return; // If no token, user or movie is available, don't proceed with the fetch

    fetch(`https://movie-fetcher-5a8669cd2c54.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((resUser) => {
        if (resUser) {
          setUserForm(resUser); // Update the state of the user
          let filteredFavoriteMovies = movies.filter(m => resUser.favoriteMovies?.includes(m._id));
          setFavoriteMovies(filteredFavoriteMovies);
        } else {
          alert("User not found.");
        }
      }).catch((error) => {
        console.log("Fetching user data failed: ", error);
      });
  }, [token, user, movies]);


  // Handle profile edit/update
  const handleUpdateProfile = (event) => {
    event.preventDefault(); // Prevents the default behavior (to reload the entire page)

    fetch(`https://movie-fetcher-5a8669cd2c54.herokuapp.com/users/${username}`, {
      method: "PUT",
      body: JSON.stringify(userForm),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((resUser) => {
        alert("You have successfully edited your profile!");
        localStorage.setItem("user", JSON.stringify(resUser));
      })
      .catch((error) => {
        console.log("Error updating user data: ", error);
        alert(`Updating your profile failed: ${error.message}`);
      }).finally(() => {
        setIsEditing(false); // Exit edit mode, no matter if success or failure
      });
  };

  

  // Handle deregister / delete account
  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');

    if (confirmDelete) {
      fetch(`https://movie-fetcher-5a8669cd2c54.herokuapp.com/users/${username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // .then((response) => response.json())
      .then(() => {
        alert("You have successfully deleted your account!");
        setUser(null);
        navigate("/signup");
        localStorage.clear();
      }).catch((error) => {
        console.log("Error deleting user data: ", error);
        alert(`Deleting your profile failed: ${error.message}`);
      });
    };
  };

  if (!user || !userForm?.username) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading profile...</span>
      </Spinner>
    );
  } // Avoid error if the data isn't ready, before rendering the profile

  return (
    <Row className="main mb-5 mt-5">
      <h1 className="mb-5">My profile</h1>
      {!IsEditing ? (
        <Col>
          <Col className="mb-5">
            <div className="mb-4">
              <h4>Username:</h4>
              <p>{userForm.username}</p>
            </div>
            <div className="mb-4">
              <h4>Email address:</h4>
              <p>{userForm.email}</p>
            </div>
            <div className="mb-5">
              <h4>Date of birth:</h4>
              <p>{userForm.birthDate.split("T")[0]}</p>
            </div>
            <Button className="me-4" variant="secondary" onClick={() => setIsEditing(true)}>Edit profile</Button>
            <Button variant="danger" onClick={handleDeleteAccount}>Delete account</Button>
          </Col>
          <hr className="mb-5" />
          <Col>
            <h3 className="mb-5">Your favorite movies</h3>
            <Row>
              {favoriteMovies.length === 0 ? (
                <p>You still don't have favorite movies.</p>
                ) : (
                  favoriteMovies?.map((movie) => (
                    <Col className="mb-5" md={6} key={movie._id}>
                      <MovieCard movie={movie} user={userForm} token={token} setUser={setUser} />
                    </Col>
                  ))
                )
              }
            </Row>
          </Col>
        </Col>
      ) : (
        <Col className="form-update">
          <Form onSubmit={handleUpdateProfile}>
            <h3 className="mb-4">Edit your profile</h3>
            <Form.Group className="mb-3 mt-4" controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                value={userForm?.username}
                name="username"
                minLength="5"
                onChange={(e) => handleChange(e)}
                placeholder="Enter your new username"
                required
              />
              <Form.Text>Your username must contain at least 5 characters.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={userForm?.password}
                minLength="8"
                onChange={(e) => handleChange(e)}
                placeholder="Enter your new password"
                required
              />
              <Form.Text>Your password must contain at least 8 characters.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userForm?.email}
                onChange={(e) => handleChange(e)}
                placeholder="Enter your new email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-5" controlId="formBirthDate">
              <Form.Label>Date of birth:</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={userForm?.birthDate.split("T")[0]}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>
            <Button className="save-btn me-4" variant="primary" type="submit">Save changes</Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
          </Form>
        </Col>
      )}
    </Row>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthDate: PropTypes.instanceOf(Date),
  }).isRequired,
};
