const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const facultyRoute = require("./routes/facultyRoute");
const studentRoute = require("./routes/studentRoute");
const resultsRoute = require("./routes/resultsRoute");
app.use(cors());

app.use("/api/faculty/", facultyRoute);
app.use("/api/student/", studentRoute);
app.use("/api/results/", resultsRoute);

const path = require("path");

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client/build/index.html"));
    });
}
  app.listen(port, () => console.log(`aloha app listening on port ${port}!`));
