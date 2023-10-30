import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    date: {
      type: String,
      // required: true,
    },
    started: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: Date,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    timeTaken: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Todo", TodoSchema);
