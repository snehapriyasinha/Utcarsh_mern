import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  state: { type: String },
  city: { type: String },
  address: { type: String, required: true },
  date: { type: Number, required: true },
});

const schemeModel =
  mongoose.models.scheme || mongoose.model("scheme", schemeSchema);

export default schemeModel;
