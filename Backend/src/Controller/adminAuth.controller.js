import Admin from "../Models/adminAuth.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

async function registerAdmin(req, res) {
  const { name, email, password } = req.body;

  // 🔥 Check if ANY admin already exists
  const existingAdmin = await Admin.findOne();

  if (existingAdmin) {
    return res.status(403).json({
      message: "Only one admin is allowed.",
    });
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const newAdmin = await Admin.create({
    name: name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: newAdmin._id,
      email: newAdmin.email,
    },
    config.jwtSecret,
    { expiresIn: "1d" }
  );

  return res.status(201).json({
    message: "Admin registered successfully.",
    token,
    admin: {
      id: newAdmin._id,
      email: newAdmin.email,
    },
  });
}




async function loginAdmin(req, res) {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }

  const isMatch =
    crypto.createHash("sha256").update(password).digest("hex") === admin.password;

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }

  const token = jwt.sign(
    {
      id: admin._id,
      email: admin.email,
    },
    config.jwtSecret,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true only in HTTPS (production)
    sameSite: "lax",
  })

  res.status(200).json({
    message: "Admin logged in successfully.",
    token,
    admin: {
      id: admin._id,
      email: admin.email,
    },
  });
}

export { registerAdmin, loginAdmin };
