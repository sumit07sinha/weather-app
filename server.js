
const bodyParser = require("body-parser");

// Express to run server and routes
const express = require("express");
const app = express();
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Create JS object
let projectData = {};
// Respond with JS object when a GET request is made to the homepage
app.post("/addPost", function (req, res) {
  const data = req.body;
  console.log(data);
  projectData = {
    date: data.date,
    temp: data.temp,
    content: data.content,
  };

  res.status(200);
  res.send({
    message: "your post received",
  });
});
app.get("/all", function (req, res) {
  res.send(projectData);
});
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 5000;
const server = app.listen(port, listening);
function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}
