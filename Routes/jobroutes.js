const express = require('express');
const verifyToken = require('../middleware/token'); // Corrected token middleware
const router = express.Router();
const verifyRoles = require('../middleware/roles'); // Corrected roles middleware
const jobController = require('../controllers/jobcontrollers');

// View the job creation form
router.get('/jobs/create-jobs', verifyToken, verifyRoles(["Admin", "Employer"]), (req, res) => {
    res.render('jobs/create-jobs', { userId: req.user.id, role: req.user.role });
});

// View jobs created by a specific company
router.get('/jobs/jobs-listed', verifyToken, verifyRoles(["Admin", "Employer"]), jobController.getJobsWithCompany);

// View all jobs (for job seekers)
router.get('/jobs/all', verifyToken, verifyRoles(["Admin", "JobSeeker"]), jobController.getAllJobs);

// View jobs created by the current user's company
router.get('/company/jobs', verifyToken, verifyRoles(["Admin", "Employer"]), jobController.getJobsWithCompany);

// Create a new job
router.post('/api/create/job', verifyToken, verifyRoles(["Admin", "Employer"]), jobController.createJob);

// Delete a job by ID
router.get('/delete/:id', verifyToken, verifyRoles(["Admin", "Employer"]), jobController.deleteJob);

module.exports = router;
