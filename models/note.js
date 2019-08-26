const mongoose = require("mongoose");

const { Schema } = mongoose;

const noteSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile"
  },
  date: {
    default: Date.now,
    type: Date,
    maxlength: 255
  },
  title: {
    type: String,
    maxlength: 255
  },
  body: {
    type: String
  }
});

const Note = mongoose.model("Note", noteSchema);

exports.Note = Note;
exports.noteSchema = noteSchema;
