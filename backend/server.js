import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doneeRouter from "./routes/doneeRoute.js";
import schemeRouter from "./routes/schemeRoute.js";
import paymentRouter from "./routes/paymentRoute.js";

//App config
const app = express();
const port = process.env.PORT || 4000; //our app will open in provided IP and if not then on port 4000
connectDB();
connectCloudinary();

//middleware
app.use(express.json()); //whatever request we recieve will be in the form of json
app.use(cors()); //we can access backend from any IP

//API endpoints
//user Authentication
app.use("/api/user", userRouter);

//donee management
app.use("/api/donee", doneeRouter);

//scheme management
app.use("/api/scheme", schemeRouter);

//payments management
app.use("/api/donation", paymentRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => console.log("Server started on port: " + port));
