const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

try {
  mongoose.connect(
    // `mongodb://eduwork:eduwork123@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
    process.env.MONGODB_URI
  );
} catch (e) {
  console.log(e);
}

const db = mongoose.connection;
db.on("error", console.log.bind(console, "Koneksi mongoose error : "));
db.once("open", () => console.log("Koneksi mongoose berhasil"));
