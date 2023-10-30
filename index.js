import express from "express";
import multer from "multer";
import fs from "fs";
import util from "util";
import mongoose from "mongoose";

import cors from "cors";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validation.js";

import { handleValidationErrors, checkAuth } from "./utils/index.js";

import { UserController, TodoController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:1188753Aa@cluster0.r1kn9df.mongodb.net/todo?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();

const mkdir = util.promisify(fs.mkdir);

const storage = multer.diskStorage({
  destination: async (_, __, cb) => {
    try {
      if (!fs.existsSync("uploads")) {
        await mkdir("uploads");
      }
      cb(null, "uploads");
    } catch (err) {
      cb(err);
    }
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/todo", TodoController.getAll);
app.get("/todo/:id", TodoController.getOne);

app.post(
  "/todo",
  postCreateValidation,
  handleValidationErrors,
  checkAuth,
  TodoController.create
);

app.delete("/todo/:id", checkAuth, TodoController.remove);

app.patch(
  "/todo/:id",
  postCreateValidation,
  handleValidationErrors,
  checkAuth,
  TodoController.update
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
