import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "inprogress", "completed"],
      default: "todo",
    },
    updatedAt:{
      type: Date,
      default: () => Date.now(),
      get: (date) => new Date(date).toUTCString(),
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      get: (date) => new Date(date).toUTCString(),
    },
    completedBy: {
      type: Date,
      default: null,
      get: (date) => new Date(date).toUTCString(),
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Todo || mongoose.model("Todo",todoSchema)