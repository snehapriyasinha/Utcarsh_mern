import mongoose from "mongoose";

const doneeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: Array, required: true },
  accepts: { type: Array, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  location: { type: String, required: true },
  date: { type: Number, required: true },
});

const doneeModel =
  mongoose.models.donee || mongoose.model("donee", doneeSchema);

export default doneeModel;
