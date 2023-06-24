const express = require("express");
const app = express();
// const port = 5000;
var cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000





const main = require("./db");
app.use(express.json())  //middleware
app.use(cors())








// Available Routes

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))





app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/api/v1/login", (req, res) => {
//   res.send("Hello login");
// });

// app.get("/api/v1/signup", (req, res) => {
//   res.send("Hello signup");
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

main();
