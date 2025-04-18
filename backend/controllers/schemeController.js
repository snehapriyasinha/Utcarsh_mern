import { v2 as cloudinary } from "cloudinary";
import schemeModel from "../models/schemeModel.js";

// Add scheme
const addScheme = async (req, res) => {
  try {
    console.log("Received request:", req.body); // Debugging

    if (!req.file) {
      console.log("No file uploaded");
      return res.json({ success: false, message: "No image provided" });
    }

    const { name, description, state, city, address } = req.body;
    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    console.log("Image uploaded:", uploadedImage.secure_url);

    const newScheme = new schemeModel({
      name,
      image: uploadedImage.secure_url,
      description,
      state,
      city,
      address,
      date: Date.now(), // Current timestamp
    });
    await newScheme.save();
    res.json({ success: true, message: "Scheme added successfully!" });
  } catch (e) {
    console.error("Error in addScheme:", e);
    res.json({ success: false, message: e.message });
  }
};

// List all schemes
const listSchemes = async (req, res) => {
  try {
    const schemes = await schemeModel.find({});
    res.json({ success: true, schemes });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

// Delete scheme
const deleteScheme = async (req, res) => {
  try {
    const scheme = await schemeModel.findById(req.body.id);

    if (!scheme) {
      return res.json({ success: false, message: "Scheme not found" });
    }

    await schemeModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Scheme deleted successfully" });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

export { addScheme, listSchemes, deleteScheme };
