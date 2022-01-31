const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/login.js"));
app.use("/", require("./routes/Register.js"));
app.use("/profile", require("./routes/profile"));
app.use("/", require("./routes/listOfFood"));
app.use('/',require('./routes/shoppingCart'));
app.use('/',require('./routes/transactions'));
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

/*
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:something_else@localhost:5432/capstone"
);

sequelize
  .authenticate()
  .then(() => {
    console.log(" SEQUELIZE DB has been CONNECTED - ");
  })
  .catch((err) => console.error(err.message));
*/
// app.get("/", (req, res) => {
//   res.send("Hello world");
// });
// const port = 8000;
// app.listen(port, () => console.log(`Server started on port ${port}`));

