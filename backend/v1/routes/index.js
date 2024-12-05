import express from "express"; // import the express module

import Auth from "./auth.js";
import Trip from "./trip.js";
import Leads from "./leads.js";
import TripV2 from "./tripv2.js";
import { Verify, VerifyAdminRole } from "../middleware/verify.js";
import multer from "multer";
import path from "path";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.parse(file.originalname).name;
    cb(null, name + "-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage: storage });

const app = express(); // Create an app object

app.disable("x-powered-by"); // Reduce fingerprinting (optional)
// home route with the get method and a handler

function uploadFiles(req, res) {
  const fileUrl =
    req.protocol + "://" + req.get("host") + "/" + req.files[0].path;
  res.status(201).send("File uploaded successfully. URL: " + fileUrl);
}

app.post("/upload", upload.array("files"), (req, res) => {
  try {
    let fileArr = [];
    for (let i = 0; i < req.files.length; i++) {
      const fileUrl =
        req.protocol + "://" + req.get("host") + "/" + req.files[i].path;
      fileArr.push(fileUrl);
    }
    res.status(201).send({ urls: fileArr });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.post("/v1/upload_files", upload.array("files"), uploadFiles);

app.use("/v1/auth", Auth);
app.use("/v1/trip", Trip);
app.use("/v1/tripv2", TripV2);
app.use("/v1/leads", Leads);
app.use(
  "/uploads",
  express.static("/home/supersquad/Supersquad/backend/uploads")
);
export default app;
