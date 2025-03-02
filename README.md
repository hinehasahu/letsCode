🌿 Wellness Community App

📌 Project Description

The Wellness Community App is a React and Node.js-based platform that helps users track their Yogasanas, participate in challenges, and engage with social groups. The app features gamification elements, such as daily and weekly challenges, streak tracking, and achievement badges.

🚀 Tech Stack

🌐 Frontend (React + Vite)

React.js

React Router

CSS

🛠️ Backend (Node.js + Express)

Node.js

Express.js

MongoDB (Mongoose for database management)

JSON Web Tokens (JWT) for authentication

bcrypt.js for password hashing

📂 Project Structure

/wellness-community-app
│── /backend # Backend (Node.js + Express + MongoDB)
│ ├── /models # Database models
│ ├── /routes # Express routes
│ ├── /controllers # Route logic
│ ├── server.js # Entry point for backend
│
│── /frontend # Frontend (React + Vite)
│ ├── /src
│ │ ├── /components # Reusable components
│ │ ├── /pages # React pages
│ │ ├── App.jsx # Main component
│ │ ├── main.jsx # Renders the App
│ │ ├── styles/ # CSS files
│ ├── index.html # Main HTML file
│
│── package.json # Dependencies
│── README.md # Project documentation

⚙️ Installation & Setup

🖥️ 1. Clone the Repository

git clone https://github.com/your-repo/wellness-community-app.git  
cd wellness-community-app  

⚙️ 2. Install Backend Dependencies

cd backend  
npm install  

⚙️ 3. Configure Environment Variables

Create a .env file inside /backend and add:

MONGO_URI=your-mongodb-connection-string  
JWT_SECRET=your-secret-key  
PORT=5000  

🚀 4. Start the Backend Server

npm start  

🌐 5. Setup the Frontend

cd ../frontend  
npm install  

🔥 6. Run the Frontend

npm run dev  

🛠️ Features

✅ User Authentication (Register, Login, Logout)✅ Join & Complete Challenges (Daily & Weekly)✅ Gamification: Streaks, Badges, Notifications✅ Social Groups for Sharing Yogasanas✅ Secure Backend with JWT Authentication

📜 API Routes

User Routes

Method

Route

Description

POST

/api/users/register

Register a new user

POST

/api/users/login

User login (JWT Auth)

GET

/api/users/profile/:id

Get user profile info

Challenge Routes

Method

Route

Description

GET

/api/challenges

Get all challenges

GET

/api/challenges/user/:id

Get user challenges

POST

/api/challenges/create

Create a new challenge

POST

/api/challenges/join/:id

Join a challenge

POST

/api/challenges/complete/:id/:userId

Complete a challenge

🔥 Usage Guide

1️⃣ Register/Login

Navigate to /register to create an account.

After registration, log in via /login.

2️⃣ Join Challenges

Click on "Join Challenge" in the Challenges section.

Once joined, the challenge moves to "My Challenges".

3️⃣ Complete Challenges

After completing a challenge, click "Complete Challenge".

Earn rewards & badges for completion!

4️⃣ Logout

Click the Logout button in the Dashboard to sign out.

📌 Future Enhancements

🔹 Improved UI/UX🔹 Leaderboard Feature🔹 Community Forum

🤝 Contributing

Contributions are welcome! Feel free to fork this repository, make changes, and submit a pull request.

🚀 Start your wellness journey today! 🌿
