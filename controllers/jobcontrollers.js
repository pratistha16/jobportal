const { Op } = require("sequelize");
const Job = require("../models/jobs");

const createJob = async (req, res) => {
    const { jobTitle, jobDescription, location, salary, jobType, expiryDate } = req.body;
    if (!jobTitle || !jobDescription || !location || !salary || !jobType || !expiryDate) {
        return res.status(400).json({ error: "jobTitle, jobDescription, location, salary, type, and expiryDate are required" });
    }
    try {
        const job = await Job.create({
            jobTitle,
            jobDescription,
            location,
            salary,
            jobType,
            companyId: req.user.id,
            expiryDate,
        });
        res.redirect("/jobs/jobs-listed");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getJobsWithCompany = async (req, res) => {
    try {
        const jobs = await Job.findAll({ where: { companyId: req.user.id } });
        res.render("jobs/jobs-listed", { jobs, role: req.user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll({
            where: {
                expiryDate: {
                    [Op.gt]: new Date(),
                },
            },
        });
        res.render("jobs/jobs-listed", { jobs, role: req.user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteJob = async (req, res) => {
    const jobId = req.params.id;
    try {
        await Job.destroy({ where: { id: jobId } });
        res.redirect("/jobs/jobs-listed");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createJob,
    getJobsWithCompany,
    getAllJobs,
    deleteJob,
};
