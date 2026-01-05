import { Semester, User } from "../models/model.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Subject } from "../models/subject.model.js";
import { Resource } from "../models/resource.model.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

/* ===================== USERS ===================== */

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// Create user
export const createUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.token = token;
    await user.save();

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===================== SEMESTERS ===================== */

export const getSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find().sort({ number: 1 });
    res.json(semesters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSemester = async (req, res) => {
  try {
    const { number } = req.body;

    if (!number) {
      return res.status(400).json({ message: "Semester number is required" });
    }

    const exists = await Semester.findOne({ number });
    if (exists) {
      return res.status(400).json({ message: "Semester already exists" });
    }

    const semester = new Semester({ number });
    await semester.save();

    res.status(201).json({ message: "Semester created", semester });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSemester = async (req, res) => {
  try {
    const { id } = req.params;

    await Subject.deleteMany({ semesterId: id });
    await Semester.findByIdAndDelete(id);

    res.json({ message: "Semester deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===================== SUBJECTS ===================== */

export const getSubjects = async (req, res) => {
  try {
    const semId = req.params.semId ?? req.params.sem_id;

    if (!semId) {
      return res.json({ success: true, subjects: [] });
    }

    const subjects = await Subject.find({ semesterId: semId });
    res.json({ success: true, subjects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSubject = async (req, res) => {
  try {
    const { name, semesterId } = req.body;

    if (!name || !semesterId) {
      return res.status(400).json({ message: "All fields required" });
    }

    const subject = new Subject({ name, semesterId });
    await subject.save();

    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const resources = await Resource.find({ subjectId: id });

    for (const r of resources) {
      if (r.publicId) {
        await cloudinary.uploader.destroy(r.publicId);
      }
    }

    await Resource.deleteMany({ subjectId: id });
    await Subject.findByIdAndDelete(id);

    res.json({ message: "Subject and resources deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===================== RESOURCES ===================== */

export const getResources = async (req, res) => {
  try {
    const subId = req.params.subId ?? req.params.sub_id;

    if (!subId) {
      return res.json({ success: true, resources: [] });
    }

    const resources = await Resource.find({ subjectId: subId }).sort({ createdAt: -1 });
    res.json({ success: true, resources });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload resource (Multer + Cloudinary)
export const createResource = async (req, res) => {
  try {
    const { title, category, subjectId } = req.body;
    const file = req.file;

    if (!title || !subjectId || !file) {
      return res.status(400).json({ message: "Title, Subject & File required" });
    }

    console.log(`[DEBUG] Received subjectId: '${subjectId}', type: ${typeof subjectId}`);
    console.log(`[DEBUG] isValid check: ${mongoose.Types.ObjectId.isValid(subjectId)}`);

    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      return res.status(400).json({ message: "Invalid Subject ID" });
    }

    const fileType = file.mimetype.includes("pdf") ? "pdf" : "image";

    const resource = new Resource({
      title,
      category,
      type: fileType,
      link: file.path,       // Cloudinary URL
      publicId: file.filename, // Cloudinary public_id
      subjectId
    });

    await resource.save();

    res.status(201).json({ message: "Resource uploaded", resource });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete resource (Cloudinary safe)
export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    if (resource.publicId) {
      await cloudinary.uploader.destroy(resource.publicId);
    }

    await Resource.findByIdAndDelete(req.params.id);

    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
