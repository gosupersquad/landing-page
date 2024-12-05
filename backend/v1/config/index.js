import * as dotenv from "dotenv";
dotenv.config();

const {
  URI,
  PORT,
  SECRET_ACCESS_TOKEN,
  EMAIL,
  PASSWORD,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} = process.env;

export {
  URI,
  PORT,
  SECRET_ACCESS_TOKEN,
  EMAIL,
  PASSWORD,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
};
