require('dotenv').config();
const express = require('express');
const app = express();
const { connectDB, sequelize } = require('./config/db'); // Corrected the import to connect the DB properly
const path = require('path');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;

// Import routes
const userRoutes = require("./routes/userroutes");
const jobRoutes = require("./routes/jobroutes");
const applicationRoutes = require("./routes/applicationroutes");

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route handling
app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);
app.use("/applications", applicationRoutes);

// Root route
app.get("/", (req, res) => {
    res.render("login");
});

// Start server and connect to DB
const startServer = async () => {
    try {
        await connectDB(); // Connects to the database
        app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("❌ Failed to start the server:", error.message);
        process.exit(1); // Exit the process if the server fails to start
    }
};

startServer();
