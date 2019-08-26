const mongoose = require("mongoose");
const db =
  "mongodb+srv://mosamy:msamy1234@cluster0-shard-00-00-ui6cx.mongodb.net:27017/test?authSource=admin";

module.exports = function() {
  mongoose.set("useCreateIndex", true);
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
};
