import "dotenv/config";
import mongoose from "mongoose";
import { Project, Testimonial, Placement, Achievement } from "./models.js";

await mongoose.connect(
  process.env.MONGO_URI ||
    "mongodb+srv://gayathrim_db_user:root@cluster0.r7jhteo.mongodb.net/learner_showcase",
);
await Promise.all(
  [Project, Testimonial, Placement, Achievement].map((m) => m.deleteMany({})),
);

const FS = "Full Stack Development (MERN)",
  DA = "Data Analytics",
  DS = "Data Science",
  ST = "Software Testing";
const photo = (n) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(n)}&background=1D4ED8&color=fff&size=128`;
const who = (learnerName, course, batch, region, extra = {}) => ({
  learnerName,
  course,
  batch,
  region,
  photoUrl: photo(learnerName),
  consent: true,
  verifiedBy: "Regional mentor",
  ...extra,
});
const VID = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

await Project.insertMany([
  {
    ...who("Anjana R", FS, "2025-B1", "Kerala", { featured: true }),
    title: "FarmLink",
    problemStatement:
      "Small farmers lack direct access to buyers and fair prices.",
    description:
      "A marketplace connecting farmers with local buyers and restaurants.",
    technologies: ["React", "Node.js", "MongoDB", "Razorpay"],
    keyFeatures: ["Live price board", "Order tracking", "Farmer ratings"],
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com",
    videoUrl: VID,
  },
  {
    ...who("Midhun K", FS, "2025-B2", "Kerala"),
    title: "ShelfShare",
    problemStatement:
      "Students cannot easily find affordable second-hand books.",
    description: "Peer-to-peer book exchange for college campuses.",
    technologies: ["React", "Express", "MongoDB"],
    keyFeatures: ["Campus-wise listings", "In-app chat"],
    githubUrl: "https://github.com/",
  },
  {
    ...who("Karthik S", DS, "2025-B2", "Tamil Nadu", { featured: true }),
    title: "Crop Yield Predictor",
    problemStatement: "Yield estimates are mostly guesswork.",
    description: "ML model that predicts yield from rainfall and soil data.",
    technologies: ["Python", "Scikit-learn", "Streamlit"],
    keyFeatures: ["Region-wise forecast", "Explainable results"],
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com",
  },
  {
    ...who("Priya D", DA, "2025-B1", "Tamil Nadu"),
    title: "Retail Sales Dashboard",
    problemStatement: "A chain of shops had no single view of sales and stock.",
    description:
      "Interactive dashboard tracking sales, margins and stock-outs.",
    technologies: ["Power BI", "SQL", "Excel"],
    keyFeatures: ["Store comparison", "Reorder alerts"],
    videoUrl: VID,
  },
  {
    ...who("Sravani P", FS, "2025-B1", "Telugu", { featured: true }),
    title: "ClinicQ",
    problemStatement: "Patients wait hours at small clinics.",
    description: "Queue and appointment manager for clinics.",
    technologies: ["React", "Express", "MongoDB", "Twilio"],
    keyFeatures: ["SMS alerts", "Doctor dashboard"],
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com",
  },
  {
    ...who("Ravi T", ST, "2025-B2", "Telugu"),
    title: "Automated Checkout Test Suite",
    problemStatement:
      "Regression testing of an e-commerce checkout took two days.",
    description:
      "End-to-end automation cutting regression time to under an hour.",
    technologies: ["Selenium", "Java", "TestNG", "Jenkins"],
    keyFeatures: ["Parallel runs", "HTML reports"],
    githubUrl: "https://github.com/",
  },
  {
    ...who("Fathima N", DS, "2025-B3", "Kerala"),
    title: "Flood Risk Mapper",
    problemStatement: "Local bodies lack early flood-risk views.",
    description: "Maps flood-prone wards from rainfall and elevation data.",
    technologies: ["Python", "Pandas", "Folium"],
    keyFeatures: ["Ward heatmap", "Weekly alerts"],
    githubUrl: "https://github.com/",
  },
]);

await Testimonial.insertMany([
  {
    ...who("Midhun K", FS, "2025-B1", "Kerala", { featured: true }),
    quote: "Weekly code reviews from my mentor changed how I build software.",
    mentorSupport: "My mentor stayed on calls until my bugs were solved.",
    feedback: "Best decision of my career switch.",
    journey: "Commerce graduate to full stack developer in 6 months.",
    videoUrl: VID,
  },
  {
    ...who("Divya M", DA, "2025-B2", "Tamil Nadu"),
    quote: "The capstone gave me real portfolio work to show in interviews.",
    mentorSupport: "Clear explanations and patient doubt clearing.",
    feedback: "Practical, not just theory.",
    journey: "Teacher exploring a tech career.",
  },
  {
    ...who("Ravi T", ST, "2025-B1", "Telugu"),
    quote:
      "I started with zero testing knowledge and now automate whole suites.",
    mentorSupport: "Mock interviews built my confidence.",
    feedback: "Very structured curriculum.",
  },
  {
    ...who("Aswathy S", DS, "2025-B2", "Kerala"),
    quote: "Live projects made statistics finally make sense.",
    mentorSupport: "Mentors shared real industry examples.",
    feedback: "Worth every hour.",
    videoUrl: VID,
  },
  {
    ...who("Suresh B", FS, "2025-B3", "Tamil Nadu"),
    quote: "Building a full app end to end gave me the confidence to apply.",
    mentorSupport: "Doubt sessions were quick and helpful.",
    feedback: "Great balance of concepts and practice.",
  },
  {
    ...who("Lakshmi V", DA, "2025-B1", "Telugu"),
    quote:
      "Dashboards I built here were the first thing recruiters asked about.",
    mentorSupport: "Regular feedback on every assignment.",
    feedback: "Recommended to anyone changing careers.",
  },
]);

await Placement.insertMany([
  {
    ...who("Nithya B", FS, "2024-B3", "Kerala", { featured: true }),
    previousBackground: "BCom graduate",
    company: "Acme Tech",
    designation: "Junior Developer",
    journey:
      "Built three projects, practised mock interviews and cleared two rounds.",
    skills: ["React", "Node.js", "MongoDB"],
    videoUrl: VID,
  },
  {
    ...who("Arun V", DS, "2024-B2", "Tamil Nadu"),
    previousBackground: "Mechanical engineer",
    company: "DataWorks",
    designation: "Data Analyst",
    journey:
      "Moved from core engineering after the capstone project opened doors.",
    skills: ["Python", "SQL", "Tableau"],
  },
  {
    ...who("Harika G", FS, "2024-B3", "Telugu", { featured: true }),
    previousBackground: "Career break of 3 years",
    company: "Nimbus Software",
    designation: "Software Engineer",
    journey:
      "Restarted her career with guidance from mentors and a strong project portfolio.",
    skills: ["React", "Express", "MongoDB"],
    videoUrl: VID,
  },
  {
    ...who("Jithin P", ST, "2024-B2", "Kerala"),
    previousBackground: "Diploma in electronics",
    company: "QualityFirst",
    designation: "QA Engineer",
    journey: "Automation project and mock interviews helped him land the role.",
    skills: ["Selenium", "Java", "API testing"],
  },
  {
    ...who("Meena L", DA, "2024-B3", "Tamil Nadu"),
    previousBackground: "BSc Mathematics",
    company: "Insight Analytics",
    designation: "Business Analyst",
    journey: "Used her dashboard project as her main interview talking point.",
    skills: ["Power BI", "SQL", "Excel"],
  },
  {
    ...who("Pavan K", DS, "2024-B1", "Telugu"),
    previousBackground: "BTech graduate",
    company: "NeuralLeaf",
    designation: "Junior Data Scientist",
    journey: "Won an internal hackathon, which led to a full-time offer.",
    skills: ["Python", "ML", "Pandas"],
  },
]);

await Achievement.insertMany([
  {
    ...who("Team Pixel", FS, "2025-B1", "Kerala", { featured: true }),
    title: "Won state-level hackathon",
    type: "Hackathon",
    description: "First place among 120 teams.",
  },
  {
    ...who("Meena L", DA, "2025-B2", "Tamil Nadu"),
    title: "Microsoft Power BI certified",
    type: "Certification",
    description: "Cleared the PL-300 exam on the first attempt.",
  },
  {
    ...who("Sai K", FS, "2025-B1", "Telugu"),
    title: "Open-source contributor",
    type: "Milestone",
    description: "Had three pull requests merged into a popular React library.",
  },
  {
    ...who("Anand R", DS, "2025-B2", "Kerala"),
    title: "Top 5% in Kaggle competition",
    type: "Award",
    description: "Placed in the top 5% of a public prediction contest.",
  },
  {
    ...who("Team Byte", ST, "2025-B2", "Tamil Nadu"),
    title: "Runner-up, college testing challenge",
    type: "Hackathon",
    description: "Built an automated test framework in 24 hours.",
  },
  {
    ...who("Kavya M", FS, "2025-B3", "Telugu"),
    title: "AWS Cloud Practitioner certified",
    type: "Certification",
    description: "Earned the certification while finishing the course.",
  },
]);

// Items waiting in the admin approval queue (not visible on the public site)
const pend = { status: "pending", consent: false, verifiedBy: "" };
await Project.insertMany([
  {
    ...who("Nikhil J", FS, "2025-B3", "Kerala", pend),
    title: "TripSplit",
    problemStatement: "Group trips make expense tracking messy.",
    description: "Shared expense tracker for travel groups.",
    technologies: ["React", "Node.js"],
    keyFeatures: ["Auto split", "Settle-up summary"],
  },
  {
    ...who("Bhavana R", DA, "2025-B3", "Telugu", pend),
    title: "HR Attrition Insights",
    problemStatement: "HR could not see why people leave.",
    description: "Analysis of attrition drivers with a dashboard.",
    technologies: ["Python", "Power BI"],
    keyFeatures: ["Exit reasons", "Department view"],
  },
]);
await Placement.insertMany([
  {
    ...who("Yamuna S", FS, "2025-B1", "Tamil Nadu", pend),
    previousBackground: "BA English",
    company: "BrightApps",
    designation: "Frontend Developer",
    journey: "Awaiting verification.",
    skills: ["React", "CSS"],
  },
]);
await Testimonial.insertMany([
  {
    ...who("Rahul C", ST, "2025-B3", "Kerala", { ...pend, status: "draft" }),
    quote: "Draft testimonial awaiting a video.",
    feedback: "To be completed by the coordinator.",
  },
]);

console.log("Seeded: published demo data plus a few pending and draft items");
process.exit();
