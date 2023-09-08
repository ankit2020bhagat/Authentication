const express = require("express");
require("dotenv").config();
const cors = require("cors");
const conectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 8000;
const authRoute = require("./routes/Authroute");
conectDB();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is listeninig on ${PORT}`);
});
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);
