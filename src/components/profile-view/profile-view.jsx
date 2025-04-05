import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router";

export const ProfileView = ({ user, token , setUser, movies }) => {
  const [IsEditing, setIsEditing] = useState(false);
  const [ userForm, setUserForm] = useState({});
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
    if (!token) return; // If no token is available, don't proceed with the fetch

    console.log(user);

    fetch(`https://movie-fetcher-5a8669cd2c54.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          setUserForm(user); // Update the state of the component
          let filteredFavoriteMovies = movies.filter(m => user.favoriteMovies.includes(m._id));
          setFavoriteMovies(filteredFavoriteMovies);
        } else {
          alert("User not found.");
        }
      }).catch((error) => {
        console.log("Fetching user data failed: ", error);
      });
  }, [token, user]);






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
      .then((response) => {
        console.log('Response Status:', response); // Log the response status
        alert("You have successfully edited your profile!");
        localStorage.setItem("user", JSON.stringify(user));
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
  }


  return (
    <Row>
      <h3>My profile</h3>
      {!IsEditing ? (
        <Col>
          <Col>
            <div>
              <h4>Username:</h4>
              <p>{userForm.username}</p>
            </div>
            <div>
              <h4>Email address:</h4>
              <p>{userForm.email}</p>
            </div>
            <div>
              <h4>Date of birth:</h4>
              <p>{userForm.birthDate}</p>
            </div>
            <Button variant="secondary" onClick={() => setIsEditing(true)}>Edit profile</Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete account
          </Button>
          </Col>
          <Col>
            <h3>Your favorite movies:</h3>
            <Row>
              {favoriteMovies.length === 0 ? (
                <p>You still don't have favorite movies.</p>
                ) : (
                  favoriteMovies?.map((movie) => (
                      <MovieCard
                        key={movie._id}
                        movie={movie}
                      />
                  ))
                )
              }
            </Row>
          </Col>
        </Col>
      ) : (
        <Col>
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
              <Form.Text muted>
                Your username must contain at least 5 characters.
              </Form.Text>
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
              <Form.Text muted>
                Your password must contain at least 8 characters.
              </Form.Text>
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
            <Form.Group className="mb-3" controlId="formBirthDate">
              <Form.Label>Date of birth:</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={userForm?.birthDate}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save changes
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
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
