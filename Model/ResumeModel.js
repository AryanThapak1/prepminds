const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
    College_Name: { type: String, required: true },
    CGPA: { type: Number, required: true },
    CourseName: { type: String, required: true },
    SessionStart: { type: Date, required: true },
    SessionEnd: { type: Date, required: true }
});

const schoolSchema = new mongoose.Schema({
    School_Name: { type: String, required: true },
    Percentage: { type: Number, required: true },
    CourseName: { type: String, required: true },
    SessionStart: { type: Date, required: true },
    SessionEnd: { type: Date, required: true }
});

const educationSchema = new mongoose.Schema({
    College: collegeSchema,
    School: schoolSchema
});

const technicalSkillsSchema = new mongoose.Schema({
    Programming_Languages: { type: [String], required: true },
    Technologies: { type: [String], required: true },
    Operating_System: { type: [String], required: true },
    Database: { type: [String], required: true },
    Tools: { type: [String], required: true },
    Libraries: { type: [String], required: true }
});

const skillsSchema = new mongoose.Schema({
    Technical_Skills: technicalSkillsSchema,
    Soft_Skills: { type: [String], required: true }
});

const projectSchema = new mongoose.Schema({
    Project_Name: { type: String, required: true },
    Description: { type: [String], required: true }
});

const resumeSchema = new mongoose.Schema({
    Name: { type: String, required: [true, 'Name is required'] },
    Address: { type: String, required: [true, "An address is required"] },
    Mobile_No: { type: Number, required: [true, "Mobile Number is required"] },
    LinkedIn_url: { type: String, required: [true, "LinkedIn URL is necessary"] },
    github_url: { type: String, required: [true, "GitHub URL is required"] },
    Education: educationSchema,
    Skills: skillsSchema,
    Projects: { type: [projectSchema], required: true },
    Scores_And_Certifications: { type: [String], required: true },
    Awards_And_Accomplishments: { type: [String], required: true }
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
