const express = require("express");

const users = require("../routes/users");
const profile = require("../routes/profile");
const notes = require("../routes/notes");
const upload = require("../routes/upload");
const auth = require("../routes/auth");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/profile", profile);
  app.use("/api/notes", notes);
  app.use("/api/upload", upload);
  app.use("/api/auth", auth);
  app.use("/api/uploads", express.static("uploads"));
  app.use("/", express.static("public"));
};
