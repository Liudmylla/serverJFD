const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    completedMeetings: { type: Number },
    image: String,
    professions: { type: Schema.Types.ObjectId, ref: "Profession" },
    qualities: [{ type: Schema.Types.ObjectId, ref: "Quality" }],
    rate: Number,
    sex: { type: String, enum: ["mail", "female", "other"] },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
