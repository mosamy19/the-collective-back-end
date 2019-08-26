const mongoose = require("mongoose");

const { Schema } = mongoose;

const companySchema = new Schema({
  name: {
    type: String,
    maxlength: 255
  },
  location: {
    type: String,
    maxlength: 255
  },
  website: {
    type: String
  }
});

const Company = mongoose.model("Company", companySchema);

exports.Company = Company;
exports.companySchema = companySchema;
