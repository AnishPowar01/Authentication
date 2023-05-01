const express = require("express");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

require("./config/db").dbConnect();

// route

const user = require("./routes/userRoute");
// const { dbConnect } = require("./config/db");

app.use("/api/v1", user);

app.listen(PORT, (req, res) => {
  console.log(`App is listening at ${PORT}`);
});
