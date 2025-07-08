# 🎬 MovieFetcher-React-client App

## Project description

**MovieFetcher-React-client** is a client-side single page application (SPA) built with **React** that allows users to explore a wide selection of movies and interact with a RESTful API backend. It uses a component-based architecture to create a dynamic user experience.

___


## 🚀 Features 

As a user, you will be able to:
- ✅ **Sign Up** – Create an account to start using MovieFetcher.
- 🔐 **Log In** – Securely log in to access all app features.
- 🎞️ **Browse Movies** – View a list of all available movies.
- 🔍 **Search Bar** - Possibility to search movies by title, genre or director's name.
- 📄 **Movie Details** – Click on certain movie card to view:
  - Title, Description
  - Genre & Director info
  - List of Actors
  - Release Year, Duration & Rating
  - **Similar movies by genre**
  - ❤️ **Favorites** – Add or remove any movie from your personal list of favorites.
- 👤 **Profile Management**:
  - View your registration details
  - Edit your username, password, email, and birthday
  - Delete your account
  - View and manage your list of favorite movies
- 🔓 **Log Out** – Securely log out of your account.

___


## 🧱 Components / Views

The app is built using modular and reusable React components:

- **MainView** – Displays the full list of movies after login, allows users to search movies.
- **MovieView** – Shows details about a selected movie, including similar movies.
- **MovieCard** – A card-style component representing individual movies.
- **LoginView** – Allows users to log in.
- **SignupView** – Allows new users to register.
- **ProfileView** – Displays and manages user account details and favorite movies.

___

## Geting Started

### Prerequisites

Install dependencies `npm install`.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tamperic/movieFetcher-client.git
   
2. Navigate to the project:
    ```bash
    cd movieFetcher-client

3. 3. Run the following command to start the server:
    ```bash
    npm start

4. Open the app in browser at localhost.

___

## 🛠️ Technologies Used

- **React.js** a JS library for building user interfaces
- **React-router** (a state-based) library for routing between multiple views
- **React-Bootstrap** a popular frontend framework that provides a responsive and consistent UI
- **Parcel** bundler a build tool for faster performance during development process
- **Prop-Types** a runtime type checking for React props
- Hosted on **Netlify**.

___

## 🔗 Live Demo 

Check out the **MovieFetcher-React-client** app deployed on Netlify: <br/>
[MovieFetcher Live Demo](https://movie-fetcher-client.netlify.app/login)