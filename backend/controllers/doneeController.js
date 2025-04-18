import { v2 as cloudinary } from "cloudinary";
import doneeModel from "../models/doneeModel.js";

//add donee
const addDonee = async (req, res) => {
  try {
    console.log("Received Files:", req.files); // Debugging

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.json({ success: false, message: "No files received" });
    }

    const {
      name,
      description,
      category,
      accepts,
      state,
      city,
      address,
      phone,
      location,
    } = req.body;

    const image1 = req.files.image1 ? req.files.image1[0] : null;
    const image2 = req.files.image2 ? req.files.image2[0] : null;
    const image3 = req.files.image3 ? req.files.image3[0] : null;
    const image4 = req.files.image4 ? req.files.image4[0] : null;

    const images = [image1, image2, image3, image4].filter(Boolean);

    if (images.length === 0) {
      return res.json({ success: false, message: "No images to upload" });
    }

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        try {
          console.log("Uploading:", item.path); // Debug log
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        } catch (uploadError) {
          console.error("Cloudinary Upload Error:", uploadError);
          throw new Error("Image upload failed");
        }
      })
    );
    // console.log("Uploaded Images URLs:", imagesUrl);

    const newDonee = {
      name,
      description,
      category,
      image: imagesUrl,
      accepts: JSON.parse(accepts),
      state,
      city,
      address,
      phone,
      location,
      date: Date.now(),
    };
    console.log(newDonee);
    const donee = new doneeModel(newDonee);
    await donee.save();
    res.json({
      success: true,
      message: "Donee added successfully!",
    });
  } catch (e) {
    console.error("Error in addDonee:", e);
    res.json({ success: false, message: e.message });
  }
};

//list donee
const listDonees = async (req, res) => {
  try {
    const donees = await doneeModel.find({});
    res.json({ success: true, donees });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

//delete donee
const deleteDonee = async (req, res) => {
  try {
    await doneeModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Donee data deleted successfully" });
  } catch (e) {
    console.log(e);
    res.json({ success: true, message: e.message });
  }
};

//donee info
const singleDonee = async (req, res) => {
  try {
    const { doneeId } = req.body;
    const donee = await doneeModel.findById(doneeId);

    if (!donee) {
      return res.json({ success: false, message: "Donee not found" });
    }

    res.json({ success: true, donee });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

export { addDonee, listDonees, deleteDonee, singleDonee };
