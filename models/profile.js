const mongoose = require("mongoose");

const { Schema } = mongoose;

const characterSchema = new Schema({
  name: {
    type: String
  }
});

const profileSchema = new Schema({
  firstName: {
    type: String,
    maxlength: 50
  },
  lastName: {
    type: String,
    maxlength: 50
  },
  city: {
    type: String,
    maxlength: 255
  },
  state: {
    type: String,
    maxlength: 255
  },
  country: {
    type: String,
    maxlength: 255
  },
  profileImg: {
    type: String
  },
  notes: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },
  primaryEmail: {
    type: String,
    maxlength: 255
  },
  email: {
    type: String,
    maxlength: 255
  },
  primaryPhone: {
    type: String,
    maxlength: 255
  },
  phone: {
    type: String,
    maxlength: 255
  },
  bio: {
    type: String
  },
  superpowers: [characterSchema],
  weaknesses: [characterSchema],
  companies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Company"
    }
  ],
  facebook: {
    type: String,
    maxlength: 255
  },
  instagram: {
    type: String,
    maxlength: 255
  },
  twitter: {
    type: String,
    maxlength: 255
  },
  linkedIn: {
    type: String,
    maxlength: 255
  }
});

const Profile = mongoose.model("Profile", profileSchema);

exports.Profile = Profile;
exports.profileSchema = profileSchema;
