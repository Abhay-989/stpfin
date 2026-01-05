import express from "express";
import { upload } from "../middleware/upload.js";

import {
  getUsers,
  createUser,
  deleteUser,
  login,

  getSemesters,
  createSemester,
  deleteSemester,

  getSubjects,
  createSubject,
  deleteSubject,

  getResources,
  createResource,
  deleteResource
} from "../controllers/controller.js";

const router = express.Router();

/* ===================== USERS ===================== */
router.get("/users", getUsers);
router.post("/user", createUser);
router.post("/login", login);
router.delete("/user/:id", deleteUser);

/* ===================== SEMESTERS ===================== */
router.get("/semesters", getSemesters);
router.post("/semester", createSemester);
router.delete("/semester/:id", deleteSemester);

/* ===================== SUBJECTS ===================== */
router.get("/subjects/:semId", getSubjects);
router.post("/subject", createSubject);
router.delete("/subject/:id", deleteSubject);

/* ===================== RESOURCES ===================== */
router.get("/resources/:subId", getResources);
router.post('/resource', upload.single('file'), createResource);
router.delete("/resource/:id", deleteResource);

export default router;
