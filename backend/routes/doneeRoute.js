import express from "express";
import {
  addDonee,
  listDonees,
  deleteDonee,
  singleDonee,
} from "../controllers/doneeController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const doneeRouter = express.Router();

doneeRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]),
  addDonee
);
doneeRouter.get("/list", listDonees);
doneeRouter.post("/delete", adminAuth, deleteDonee);
doneeRouter.post("/single", singleDonee);

export default doneeRouter;
