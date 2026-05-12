# Employee Management System

A comprehensive full-stack web application for managing employees, attendance, tasks, and organizational hierarchies. Built with modern technologies and designed for scalability and ease of use.

## 🌟 Features

- **User Authentication & Authorization**: Secure login with JWT tokens
- **Role-Based Access Control**: Admin, Manager, and Employee roles with specific permissions
- **Employee Management**: Add, update, and manage employee records
- **Attendance Tracking**: Track and monitor employee attendance
- **Task Management**: Create, assign, and track employee tasks
- **Admin Dashboard**: Comprehensive overview and management tools
- **Manager Dashboard**: Team and task management capabilities
- **Employee Dashboard**: Personal task and attendance view

## 🏗️ Architecture

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs for hashing
- **API Communication**: RESTful API with CORS support
- **Port**: 5000

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Port**: 5173 (Development)

## 📁 Project Structure

```
Employee Management/
├── backend/
│   ├── app.js                 # Express app entry point
│   ├── package.json           # Backend dependencies
│   ├── controllers/           # Route controllers
│   │   ├── adminController.js
│   │   ├── attandanceController.js
│   │   ├── authController.js
│   │   ├── managerController.js
│   │   └── taskController.js
│   ├── middleware/            # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── roleMiddlware.js
│   ├── models/               # Database models
│   │   ├── attandanceModel.js
│   │   ├── taskModel.js
│   │   └── userModel.js
│   └── routes/               # API routes
│       ├── adminRoutes.js
│       ├── attandanceRoutes.js
│       ├── authRoutes.js
│       ├── managerRoutes.js
│       └── taskRoutes.js
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   ├── App.css           # Global styles
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Base styles
│   ├── pages/                # Page components
│   │   ├── AdminDashboard.jsx
│   │   ├── EmployeeDashboard.jsx
│   │   ├── Login.jsx
│   │   ├── ManagerDashboard.jsx
│   │   └── Register.jsx
│   ├── components/           # Reusable components
│   ├── services/             # API services
│   ├── utils/                # Utility functions
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   └── eslint.config.js      # ESLint configuration
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:5173
   PORT=5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   Or for production:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173`

### Build for Production

Frontend build:
```bash
cd frontend
npm run build
```

## 🔐 API Routes

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login user

### Admin Routes (`/api/admin`)
- `GET /users` - Get all users
- `DELETE /users/:id` - Delete user
- `PUT /users/:id` - Update user

### Manager Routes (`/api/manager`)
- `GET /team` - Get team members
- `GET /tasks` - Get team tasks
- `POST /tasks` - Create task

### Attendance Routes (`/api/attendance`)
- `POST /mark` - Mark attendance
- `GET /history` - Get attendance history
- `GET /report` - Get attendance report

### Task Routes (`/api/tasks`)
- `GET /` - Get all tasks
- `POST /` - Create task
- `PUT /:id` - Update task
- `DELETE /:id` - Delete task

## 🔑 User Roles & Permissions

### Admin
- View all employees
- Manage employee records
- View system reports
- Configure system settings

### Manager
- View team members
- Assign tasks to employees
- View team attendance
- Monitor task progress

### Employee
- View personal dashboard
- Mark attendance
- View assigned tasks
- Update task status

## 🛠️ Technologies Used

### Backend
- Express.js - Web framework
- MongoDB - NoSQL database
- Mongoose - ODM for MongoDB
- JWT - Token-based authentication
- bcryptjs - Password hashing
- CORS - Cross-Origin Resource Sharing

### Frontend
- React 19 - UI library
- Vite - Build tool
- React Router - Client-side routing
- Tailwind CSS - Utility-first CSS framework
- Axios - HTTP client
- ESLint - Code linting

## 📝 Environment Variables

Create `.env` file in the backend directory:

```env
# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Server Port
PORT=5000
```

## 🧪 Testing

Currently, test specifications are placeholder. To add tests:

```bash
cd backend
npm test
```




**Note**: This is a full-stack application. Make sure to run both the backend and frontend servers for the complete functionality.
