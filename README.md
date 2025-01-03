# 🗂️ Project Management Software

A simple and robust project management software built with **Node.js**, **Express**, **Prisma**, and **MySQL**. It empowers users to manage projects, tasks, and collaborate seamlessly with team members.

## ✨ Features

- 🔒 **User Authentication**: Register, login, and logout functionality.
- 🛠️ **Project Management**: Create, update, and delete projects.
- ✅ **Task Management**: Create, update, and delete tasks.
- 👥 **User Roles & Permissions**: Admin, Project Manager, and User roles.
- 💬 **Task Commenting**: Stay connected with team discussions.
- ✉️ **Email Notifications**: Receive updates directly in your inbox.
- 📱 **Responsive Design**: Optimized for all devices.

## 🛠️ Technologies Used

- **Node.js**
- **Express**
- **Prisma**
- **MySQL**
- **JWT** for authentication
- **Joi** for input validation
- **Helmet** for enhanced security
- **dotenv** for environment variables

## 🚀 Getting Started

```bash
# Clone the repository and navigate to the project directory
git clone git@github.com:fitiha/pms-server.git
cd pms-server

# Install dependencies
npm install

# Set up environment variables
# Create a .env file in the root directory and add the following:
DATABASE_URL="mysql://user:password@localhost:3306/database"
JWT_SECRET="your_jwt_secret"
PORT=5000

# Run Prisma migrations to set up the database schema
npx prisma migrate dev --name init

# Start the server
npm start
```

### 🎉 Happy Coding!

Craft your project management solutions with ease and efficiency. Contributions and feedback are welcome!
