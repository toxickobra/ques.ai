
# 📺 Management App

Ques.AI is a robust web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to store and manage their projects, with each project consisting of multiple episodes.

[![Watch the video](https://img.youtube.com/vi/2tRl6j0LaB4/0.jpg)]([https://www.youtube.com/watch?v=https://img.youtube.com/vi/2tRl6j0LaB4/0.jpg](https://youtu.be/T98Q0IXDQME?si=Si0wNL4wVJGAazHM))

### ☝️Watch the video by clicking on the image


## 🌟 Features

- 🔐 Secure user authentication using JWT
- 📊 State management with Redux
- 📁 Create, read, update, and delete projects
- �Episode management within each project
- 🎨 Responsive and intuitive user interface

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- MongoDB (v4.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ques.ai.git
   cd episodekeeper
   ```

2. Install dependencies for both server and client:
   ```
   npm install
   cd client
   npm install
   ```

3. Create a `.env` file in the backend directory and add:
   ```
   MONGODB_URI=your_mongodb_uri_here
   JWT_SECRET=your_jwt_secret_here
   SESSION_SECRET=your_secret_key
   PORT=your_port_on_which_you_want_to_run_locally
   ```
3. Create a `.env` file in the client directory and add:
   ```
   VITE_API_URL=your_vite_api_url
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## 🏗️ Project Structure

```
Ques.AI/
client/
├── public/
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   ├── SidebarComponent/
│   │   │   ├── Card.jsx
│   │   │   ├── CreateProjectPopup.jsx
│   │   │   ├── projectCard.jsx
│   │   │   ├── UploadProject.jsx
│   │   │   └── UserProfile.jsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── CreateProject.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ProjectDetails.jsx
│   │   │   └── Register.jsx
│   │   └── App.jsx
│   └── index.css
├── main.jsx
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── node_modules/
├── routes/
├── env/
├── package-lock.json
├── package.json
└── server.js
├── .env                    # Environment variables
└── package.json            # Project dependencies and scripts
```

## 🛠️ Built With

- [MongoDB](https://www.mongodb.com/) - Database
- [Express.js](https://expressjs.com/) - Web framework
- [React.js](https://reactjs.org/) - Frontend library
- [Node.js](https://nodejs.org/) - Runtime environment
- [Redux](https://redux.js.org/) - State management
- [JWT](https://jwt.io/) - Authentication

### API Endpoints

| Endpoint                         | Method | Description                         | Authentication |
|----------------------------------|--------|-------------------------------------|----------------|
| `/api/auth/register`             | POST   | Register a new user                 | Public         |
| `/api/auth/login`                | POST   | Login user                          | Public         |
| `/api/auth/logout`               | POST   | Logout current user                 | Required       |
| `/api/auth/profile`              | GET    | Get current user profile            | Required       |
| `/api/auth/profile`              | PUT    | Update current user profile         | Required       |
| `/api/auth/profile`              | DELETE | Delete current user profile         | Required       |
| `/api/projects`                  | GET    | Get all projects for current user   | Required       |
| `/api/projects`                  | POST   | Create a new project                | Required       |
| `/api/projects/:id`              | GET    | Get a specific project by ID        | Required       |
| `/api/projects/:id`              | DELETE | Delete a project by ID              | Required       |
| `/api/:projectId/objects`        | POST   | Create a new object in a project    | Required       |
| `/api/:projectId/objects`        | GET    | Get all objects for a project       | Required       |
| `/api/objects/:objectId`         | PUT    | Update a specific object by ID      | Required       |
| `/api/objects/:objectId`         | DELETE | Delete a specific object by ID      | Required       |


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
