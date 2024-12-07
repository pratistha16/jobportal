const bcrypt = require("bcrypt");
const Company = require("../models/companies");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { name, email, password, companyName, role, address, contactInfo } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Name, email, password, and role are required" });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const filePath = req.file ? req.file.path : "";

        let user;
        if (role === "JobSeeker") {
            user = await User.create({
                name,
                email,
                password: hashedPassword,
                role,
                validDocument: filePath,
            });
        } else if (role === "Employer") {
            user = await User.create({
                name,
                email,
                password: hashedPassword,
                role,
                validDocument: filePath,
            });
            await Company.create({
                id: user.id,
                companyName,
                address,
                contactInfo,
            });
        } else {
            return res.status(400).json({ error: "Invalid role" });
        }
        res.status(201).render("login", { message: "Registration successful. Please log in." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid password" });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/dashboard");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};

module.exports = { registerUser, loginUser, logoutUser };
