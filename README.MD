Job Portal Application

A simple Job Portal Application that allows users to register as Job Seekers or Employers, manage job listings, and apply for jobs.

📋 Features

User Authentication: Register and login as Job Seeker or Employer.

Job Listings: View, create, and manage job listings.

Job Applications: Apply for jobs as a Job Seeker.

File Uploads: Upload documents during registration.

Role Selection: Choose role during registration (Job Seeker or Employer).

📁 Folder Structure

📁 jobportal ├── 📁 config # Database connection ├── 📁 controllers # Controller logic ├── 📁 middleware # Authentication, role checks ├── 📁 migrations # Sequelize migrations ├── 📁 models # Sequelize models ├── 📁 routes # Route files ├── 📁 views # EJS templates ├── 📁 public # Static files (CSS, JS) ├── .env # Environment variables ├── app.js # Main server file ├── package.json # NPM scripts

⚙️ Technologies Used

Node.js & Express.js (Backend server)

Sequelize (ORM for MySQL)

MySQL (Database)

EJS (Templating engine)

JWT (Authentication)

Multer (File uploads)

bcrypt (Password hashing)

📥 Installation

Clone the repo:

git clone https://github.com/your-username/jobportal.git cd jobportal

Install dependencies:

npm install

Set up environment variables in .env:

DB_USERNAME=root DB_PASSWORD=your_password DB_DATABASE=job_portal DB_HOST=127.0.0.1 DB_DIALECT=mysql PORT=3000 JWT_SECRET=your_super_secret_key

Create the database:

CREATE DATABASE job_portal;

Run Migrations:

npx sequelize-cli db:migrate

Start the server:

npm run dev

📡 API Endpoints

Endpoint Method Description /users/login POST Login for Job Seekers/Employers /users/register POST Register a new user /jobs/all GET View all job listings /jobs/create-job POST Create a new job listing /applications/apply/:id POST Apply for a job

🐞 Possible Issues & Fixes

Issue Solution DB connection failed Check .env DB credentials Port in use Change PORT in .env JWT Token not found Ensure cookie-parser is set File upload issues Verify multer configuration

📜 Scripts

Command Description npm start Start the server (production) npm run dev Start with nodemon (development) npx sequelize-cli db:migrate Run database migrations

🚀 Contributing

Fork the repo.

Create a feature branch.

Push changes and open a pull request.

📃 License

This project is open-source under the MIT License.

With this README, you have all the essential instructions to run, use, and contribute to the Job Portal Application. Let me know if you'd like any adjustments! 🚀