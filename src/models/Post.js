import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    content: { type: String, required: true },
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    delete: {type: Boolean, default: false},
  }, { timestamps: true }, { versionKey: false }
);

mongoose.model("Post", schema);

export default mongoose.model("Post");