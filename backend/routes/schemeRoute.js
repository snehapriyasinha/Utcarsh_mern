import express from "express";
import {
  addScheme,
  listSchemes,
  deleteScheme,
} from "../controllers/schemeController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const schemeRouter = express.Router();

schemeRouter.post(
  "/add",
  adminAuth,
  upload.single("image"), // Only one image required for schemes
  addScheme
);
schemeRouter.get("/list", listSchemes);
schemeRouter.post("/delete", adminAuth, deleteScheme);

export default schemeRouter;
