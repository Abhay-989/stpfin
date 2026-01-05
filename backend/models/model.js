import mongoose from "mongoose";

/* ================= USER ================= */

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    token: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

/* ================= SEMESTER ================= */

const semesterSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

export const Semester = mongoose.model("Semester", semesterSchema);
