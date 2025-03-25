import React from "react";

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
    .then((response) => response.json()) // Transforms the response conent into a JSON object that code can use to extract the JWTsent by MovieFetcher API
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        // After successful login, the user object and token will be  stored using localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("No such user.");
      }
    })
    .catch((e) => {
      alert("Something went wrong.");
    });
  }

  // onSubmit tells the login API to validate username & password
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} minLength={5} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
};