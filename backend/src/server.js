import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-me";

// Allow configuring frontend origin via env for deployment.
// Supports multiple origins (comma-separated) or "*" for all origins
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 
  (process.env.NODE_ENV === "production" 
    ? "*" // Allow all origins in production (can be restricted to specific Netlify URL)
    : "http://localhost:5173");

// DB setup (JSON file)
const dbFile = path.join(__dirname, "db.json");
const adapter = new JSONFile(dbFile);
const db = new Low(adapter, { users: [] });
await db.read();
db.data ||= { users: [] };

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

function authMiddleware(req, res, next) {
  const token =
    req.cookies.token ||
    (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Not authenticated" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });
  }

  await db.read();
  const existing = db.data.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (existing) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = {
    id: nanoid(),
    name,
    email,
    passwordHash: hash,
  };
  db.data.users.push(user);
  await db.write();

  const token = createToken(user);
  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    })
    .json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  await db.read();
  const user = db.data.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = createToken(user);
  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    })
    .json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});

app.get("/api/profile", authMiddleware, async (req, res) => {
  await db.read();
  const user = db.data.users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ id: user.id, name: user.name, email: user.email });
});

app.put("/api/profile", authMiddleware, async (req, res) => {
  const { name } = req.body || {};
  await db.read();
  const user = db.data.users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  if (name) user.name = name;
  await db.write();
  res.json({ id: user.id, name: user.name, email: user.email });
});

// serve raw assets if needed
app.use(
  "/media",
  express.static(path.join(__dirname, "..", "..", "src", "assets"))
);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// In production, serve the built frontend from ../frontend/dist
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "..", "..", "frontend", "dist");
  app.use(express.static(distPath));

  // For any non-API route, send index.html (supports direct URL hits)
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api/")) return res.status(404).end();
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});


