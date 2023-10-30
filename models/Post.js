import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    location: String,
    main: {
      type: Boolean,
      default: true,
    },
    mainEvening: {
      type: Boolean,
      default: false,
    },
    gameCam: String,
    gameCamLink: String,
    gameDrone: String,
    gameDroneLink: String,
    gp: String,
    gpLink: String,
    gpEvening: String,
    gpLinkEvening: String,
    upr1: String,
    upr1Link: String,
    upr2: String,
    upr2Link: String,
    upr3: String,
    upr3Link: String,
    upr4: String,
    upr4Link: String,
    upr5: String,
    upr5Link: String,
    upr6: String,
    upr6Link: String,
    tgPost: String,
    upr1Evening: String,
    upr1LinkEvening: String,
    upr2Evening: String,
    upr2LinkEvening: String,
    upr3Evening: String,
    upr3LinkEvening: String,
    upr4Evening: String,
    upr4LinkEvening: String,
    upr5Evening: String,
    upr5LinkEvening: String,
    upr6Evening: String,
    upr6LinkEvening: String,
    tgPostEvening: String,
    tags: {
      type: Array,
      default: [],
    },

    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    imageUrl: String,
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
