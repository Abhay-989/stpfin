import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      enum: ["pdf", "image", "other"],
      required: true
    },
    link: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    }
  },
  { timestamps: true }
);

export const Resource = mongoose.model("Resource", resourceSchema);
