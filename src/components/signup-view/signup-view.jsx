import { useState } from "react";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");

const handleSubmit =(event) => {
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
      window.location.reload(); // Reload the page so that user can log in with their newly created account
    } else {
      alert("Signup failed.");
    }
  });
};

  // onSubmit tells the login API to validate username, password, email, and birthDate
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} minLength="3" onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Date of birth:
        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};