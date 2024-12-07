const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Database name
  process.env.DB_USERNAME, // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host
    dialect: process.env.DB_DIALECT, // Database dialect (e.g., MySQL)
    logging: false, // Disable logging; you can enable it for debugging
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error)
