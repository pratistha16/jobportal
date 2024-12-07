const JobApplication = require("../models/jobapplication"); // Updated model name
const Job = require("../models/jobs");

const createJobApplication = async (req, res) => {
    const jobId = req.params.id;
    try {
        const jobApplication = await JobApplication.create({ userId: req.user.id, jobId });
        let applications = await JobApplication.findAll({ where: { userId: req.user.id } });
        applications = await Promise.all(
            applications.map(async (application) => {
                const job = await Job.findByPk(application.jobId);
                application.job = job;
                return application;
            })
        );
        res.render("jobs/job-applications", { applications, role: req.user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getJobApplications = async (req, res) => {
    try {
        let applications = await JobApplication.findAll({ where: { userId: req.user.id } });
        applications = await Promise.all(
            applications.map(async (application) => {
                const job = await Job.findByPk(application.jobId);
                application.job = job;
                return application;
            })
        );
        res.render("jobs/job-applications", { applications, role: req.user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getJobApplicationsByJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const jobs = await Job.findAll({ where: { id: jobId } });
        const jobIds = jobs.map((job) => job.id);
        let applications = await JobApplication.findAll({ where: { jobId: jobIds } });
        applications = await Promise.all(
            applications.map(async (application) => {
                const job = await Job.findByPk(application.jobId);
                application.job = job;
                return application;
            })
        );
        res.render("jobs/job-applications", { applications, role: req.user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createJobApplication,
    getJobApplications,
    getJobApplicationsByJob,
};
