import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  donor: { type: Object, required: true },
  schemeName: { type: String, required: true },
  grossPayment: { type: Number, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true },
});

const donationModel =
  mongoose.models.donation || mongoose.model("donation", donationSchema);
export default donationModel;
