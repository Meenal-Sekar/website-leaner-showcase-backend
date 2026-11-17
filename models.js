import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const REGIONS = ["Kerala", "Tamil Nadu", "Telugu"];
export const STATUSES = ["draft", "pending", "published"];
// fields shared by every section
const base = {
  learnerName: { type: String, required: true },
  course: { type: String, required: true, index: true },
  batch: String,
  region: { type: String, enum: REGIONS, required: true, index: true },
  photoUrl: String,
  verifiedBy: String,
  consent: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: STATUSES, default: "published", index: true },
};
const make = (name, fields) =>
  model(name, new Schema({ ...base, ...fields }, { timestamps: true }));

export const Project = make("Project", {
  title: { type: String, required: true }, description: String, problemStatement: String,
  technologies: [String], keyFeatures: [String],
  githubUrl: String, liveUrl: String, videoUrl: String,
});
export const Testimonial = make("Testimonial", {
  quote: String, mentorSupport: String, feedback: String, journey: String, videoUrl: String,
});
export const Placement = make("Placement", {
  previousBackground: String, company: { type: String, required: true }, designation: String,
  journey: String, skills: [String], videoUrl: String,
});
export const Achievement = make("Achievement", {
  title: { type: String, required: true },
  type: { type: String, enum: ["Certification", "Hackathon", "Award", "Milestone"], default: "Milestone" },
  description: String,
});

export const MODELS = { projects: Project, testimonials: Testimonial, placements: Placement, achievements: Achievement };
