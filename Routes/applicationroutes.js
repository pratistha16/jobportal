const express = require('express');
const router = express.Router();
const { createJobApplication, getJobApplications, getJobApplicationsByJob } = require('../controllers/jobapplicationcontroller');
const verifyToken = require('../middleware/token'); // Correct

// Apply for a job
router.get('/apply/:id', verifyToken, createJobApplication);

// Get applications of the current user
router.get('/job-applications', verifyToken, getJobApplications);

// Get applications for a specific job
router.get('/applications/:jobId', verifyToken, getJobApplicationsByJob);

module.exports = router;
