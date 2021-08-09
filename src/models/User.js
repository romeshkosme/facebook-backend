import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    email: { type: String, required: true },
    password: {type: String, default: null},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email_verified: {type: Boolean, default: false},
    active: {type: Boolean, default: false},
    date_of_birth: {type: Object, required: true},
    gender: {type: String, required: true},
  }, { timestamps: true }, { versionKey: false }
);

mongoose.model("User", schema);

export default mongoose.model("User");