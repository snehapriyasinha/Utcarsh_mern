import express from "express";
import {
  donateStripe,
  allPayments,
  userPayments,
  verifyStripe,
} from "../controllers/donationController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const paymentRouter = express.Router();

//admin feature
paymentRouter.post("/list", adminAuth, allPayments);

//payment features
paymentRouter.post("/stripe", authUser, donateStripe);

//user feature
paymentRouter.post("/userPayments", authUser, userPayments);

//verify payments
paymentRouter.post("/verifyStripe", authUser, verifyStripe);

export default paymentRouter;
