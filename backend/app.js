require("./config/mongoose");
const express = require("express");
const app = express();
const path = require("path");
const productRouter = require("./routes/product");
const cors = require("cors");

app.use(cors());
app.use("/static", express.static(path.join(`${__dirname}/public`)));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", productRouter);

app.use((req, res) => {
  res.status(404);
  res.send({
    status: "Failed",
    message: `Resource ${req.originalUrl} not found`,
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server : http://localhost:8080`);
});
