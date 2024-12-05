import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { PORT, URI, ADMIN_EMAIL, ADMIN_PASSWORD } from "./config/index.js";
import App from "./routes/index.js";
import logger from "./logger.js";
import fs from "fs";
import https from "https";
import session from "express-session";
import bcrypt from "bcrypt";

import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import User from "./models/User.js";
import Trip from "./models/Trip.js";
import TripV2 from "./models/TripV2.js";
import Leads from "./models/Leads.js";
import Bookings from "./models/Bookings.js";
import * as url from "url";
import uploadFeature from "@adminjs/upload";
// import componentLoader from "./component-loader.js";
import path from "path";
import { ComponentLoader } from "adminjs";
const componentLoader = new ComponentLoader();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const localProvider = {
  bucket: "public/files",
  opts: {
    baseUrl: "/files",
  },
};

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

// === 1 - CREATE SERVER ===
const server = express();
// CONFIGURE HEADER INFORMATION
// Allow request from any source. In real production, this should be limited to allowed origins only
server.use(cors());
server.disable("x-powered-by"); //Reduce fingerprinting
server.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

console.log(ADMIN_EMAIL, ADMIN_PASSWORD);

const ADMIN = {
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
};

const start = async () => {
  mongoose.promise = global.Promise;
  mongoose.set("strictQuery", false);
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Connected to database"))
    .catch((err) => console.log(err));

  const adminOptions = {
    // componentLoader,
    // We pass Category to `resources`
    resources: [
      {
        resource: User,
        options: {
          properties: {
            password: {
              isVisible: {
                edit: false,
                show: false,
                list: false,
                filter: false,
              },
            },
            otp: {
              isVisible: {
                edit: false,
                show: false,
                list: false,
                filter: false,
              },
            },
            bio: {
              type: "richtext",
              props: {
                rows: 10,
              },
            },
          },
          sort: {
            sortBy: "updatedAt",
            direction: "desc",
          },
        },
      },
      {
        resource: TripV2,
        options: {
          properties: {
            description: {
              type: "richtext",
              props: {
                rows: 10,
              },
            },
            "itinerary.activities.description": {
              type: "textarea",
              props: {
                rows: 4,
              },
            },
            "itinerary.activities.images.description": {
              type: "textarea",
              props: {
                rows: 4,
              },
            },
            "faqs.experience.answer": {
              type: "textarea",
              props: {
                rows: 4,
              },
            },
            "faqs.general.answer": {
              type: "textarea",
              props: {
                rows: 4,
              },
            },
            "inclusions.description": {
              type: "textarea",
              props: {
                rows: 4,
              },
            },
            "exclusions.description": {
              type: "textarea",
              props: {
                rows: 4,
              },
            },
            "addOns.description": {
              type: "textarea",
              props: {
                rows: 4,
              },
            },
          },
        },
      },
      {
        resource: Leads,
        options: {
          sort: {
            sortBy: "updatedAt",
            direction: "desc",
          },
        },
      },
      {
        resource: Bookings,
        options: {
          sort: {
            sortBy: "updatedAt",
            direction: "desc",
          },
        },
      },
    ],
  };
  const admin = new AdminJS(adminOptions);

  // const adminRouter = AdminJSExpress.buildRouter(admin);
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate: async (email, password) => {
      if (email === ADMIN.email && password === ADMIN.password) {
        return ADMIN;
      }
      return null;
    },
    cookieName: "adminjs",
    cookiePassword: "secret-password",
  });
  server.use(admin.options.rootPath, adminRouter);
  server.use(cookieParser());
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  server.use(express.static(path.join(__dirname, "../public")));
  // === 4 - CONFIGURE ROUTES ===
  // Connect Main route to server
  server.use(App);

  const errorHandler = (err, req, res, next) => {
    logger.error(err);
    res.status(200).send("Something went wrong!");
  };

  server.use(errorHandler);
  const options = {
    key: fs.readFileSync("/home/supersquad/Supersquad/ssl/private.key"),
    cert: fs.readFileSync("/home/supersquad/Supersquad/ssl/certificate.crt"),
  };
  admin.watch();
  // === 5 - START UP SERVER ===
  https.createServer(options, server).listen(5005, () => {
    console.log("Secure server running on port 443");
  });
};

start();
