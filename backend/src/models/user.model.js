import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
          },
          password: {
            type: String,
            required: [true, "Password is required"],
          },
    },
    {
        timestamps: true,
    }
)

export const User = mongoose.model("User", userSchema);