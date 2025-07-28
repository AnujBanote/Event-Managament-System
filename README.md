A Full Stack Event Management System where users can browse, book events, and admins can manage events and view analytics dashboard.

🚀 Tech Stack
Frontend: React.js, TailwindCSS, Axios, React Router, Chart.js

Backend: Node.js, Express.js, Sequelize ORM

Database: MySQL

Authentication: JWT (JSON Web Token)

Password Security: bcrypt.js

📂 Project Structure
arduino
Copy
Edit

├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── charts/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── api.js
│   └── public/
└── README.md

✨ Features
User Side:
User Registration & Login (JWT Authentication)
Browse All Events
Book Events
View & Cancel My Bookings
Update Profile

Admin Side:
Add / Update / Delete Events
View Dashboard Stats (Users, Events, Bookings)
View Latest 5 Users & Latest 5 Bookings
View Graphs (Users Registration Trends, Bookings Trends)

🛠 Installation & Setup
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/event-management-system.git
cd event-management-system

2. Setup Backend
bash
Copy
Edit
cd backend
npm install

3. Setup Database
Create a MySQL Database named eventdb.

Configure config/config.json with your MySQL credentials.

json
Copy
Edit
{
  "development": {
    "username": "root",
    "password": "yourpassword",
    "database": "eventdb",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

4. Run Migrations & Seeders
bash
Copy
Edit
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

5. Start Backend Server
bash
Copy
Edit
npm start

6. Setup Frontend
bash
Copy
Edit
cd ../frontend
npm install
npm start
⚙️ Environment Variables
Create a .env file in the backend root:

ini
Copy
Edit
PORT=5000
JWT_SECRET=your_jwt_secret_key

📊 Admin Dashboard (Charts Used)
User Registration Trends — Bar Chart (Chart.js)

Bookings Per Event — Bar Chart (Chart.js)

Bookings Over Time — Line Chart (Chart.js)

Bookings Distribution (Optional) — Pie Chart (Chart.js)

📦 API Endpoints Summary
Auth: /api/auth/register, /api/auth/login

Users: /api/user/profile, /api/user/update

Events: /api/events (CRUD)

Bookings: /api/bookings (CRUD)

Admin Stats: /api/admin/stats, /api/admin/charts

📌 Important
Role-based Access for Admin and Users

Protected Routes using JWT Auth Middleware

Charts data is dynamically fetched via backend APIs

Fully responsive design using TailwindCSS

📸 Screenshots
### 🏠 Home Page
![Home Page](/screenshorts/HomePage.png)

### 📊 Admin Dashboard
![Admin Dashboard](/screenshorts/AdminDash.png)
![Admin Dashboard2](/screenshorts/AdminDash2.png)

### 📋 Add Event
![Add Event](/screenshorts/addEventPage.png)

### 📅 Events Page
![Events Page](/screenshorts/Events-Display.png)

### 📋 My Profile
![My Profile](/screenshorts/Profile.png)

