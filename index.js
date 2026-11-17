import "dotenv/config";
import crypto from "crypto";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { MODELS, REGIONS } from "./models.js";

const env = process.env;
const SECRET = env.JWT_SECRET || "dev-secret-change-me";
const PASSWORDS = { admin: env.ADMIN_PASSWORD || "admin123", coordinator: env.COORDINATOR_PASSWORD || "coord123" };
if (!env.JWT_SECRET) console.warn("Warning: using default dev secrets. Set them in .env before deploying.");

const app = express();
app.use(cors(), express.json());

// roles: admin = full control; coordinator = can submit entries, which stay pending until an admin approves
const auth = (...roles) => (req, res, next) => {
  try {
    const user = jwt.verify((req.get("authorization") || "").replace("Bearer ", ""), SECRET);
    if (!roles.includes(user.role)) throw new Error();
    req.user = user; next();
  } catch { res.status(401).json({ error: "Please log in with an account that can do this" }); }
};

app.post("/api/auth/login", (req, res) => {
  const { role, password } = req.body || {};
  if (!PASSWORDS[role] || password !== PASSWORDS[role]) return res.status(401).json({ error: "Wrong role or password" });
  res.json({ role, token: jwt.sign({ role }, SECRET, { expiresIn: "8h" }) });
});

// ---------- public (published content only)
app.get("/api/meta/courses", async (_req, res) => {
  const sets = await Promise.all(Object.values(MODELS).map((m) => m.distinct("course", { status: "published" })));
  res.json({ regions: REGIONS, courses: [...new Set(sets.flat())].sort() });
});

app.param("type", (req, res, next, type) =>
  MODELS[type] ? ((req.Model = MODELS[type]), next()) : res.status(404).json({ error: "Unknown section" }));

app.get("/api/:type", async (req, res) => {
  const { region, course } = req.query;
  const filter = { status: "published" };
  if (region) filter.region = String(region);
  if (course) filter.course = String(course);
  res.json(await req.Model.find(filter).sort({ featured: -1, createdAt: -1 }).limit(100));
});

// ---------- admin / coordinator
app.get("/api/admin/upload-signature", auth("admin", "coordinator"), (_req, res) => {
  if (!env.CLOUDINARY_API_SECRET) return res.status(501).json({ error: "Cloudinary is not configured in .env" });
  const timestamp = Math.floor(Date.now() / 1000), folder = "learner-showcase";
  const signature = crypto.createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${env.CLOUDINARY_API_SECRET}`).digest("hex");
  res.json({ timestamp, folder, signature, apiKey: env.CLOUDINARY_API_KEY, cloudName: env.CLOUDINARY_CLOUD_NAME });
});

app.get("/api/admin/:type", auth("admin", "coordinator"), async (req, res) => {
  const filter = req.query.status ? { status: String(req.query.status) } : {};
  res.json(await req.Model.find(filter).sort({ createdAt: -1 }).limit(200));
});
app.post("/api/admin/:type", auth("admin", "coordinator"), async (req, res) => {
  try {
    const body = { ...req.body };
    delete body._id;
    if (req.user.role === "coordinator") { body.status = "pending"; body.featured = false; }
    res.status(201).json(await req.Model.create(body));
  } catch (e) { res.status(400).json({ error: e.message }); }
});
app.put("/api/admin/:type/:id", auth("admin"), async (req, res) => {
  try { res.json(await req.Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })); }
  catch (e) { res.status(400).json({ error: e.message }); }
});
app.delete("/api/admin/:type/:id", auth("admin"), async (req, res) => {
  await req.Model.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

await mongoose.connect(env.MONGO_URI || "mongodb://127.0.0.1:27017/learner_showcase");
app.listen(env.PORT || 5000, () => console.log("API running"));
