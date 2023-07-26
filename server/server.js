const express = require("express");
const cors = require("cors");
const app = express();
// app.use(cors());

const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.ORIGIN_PORT, credentials: true }));
app.use(cookieParser());

require("./routes/User.routes")(app);
require("./routes/Profile.routes")(app);

<<<<<<< HEAD
console.log(process.env.DB_PORT);

app.listen(process.env.DB_PORT, () => {
    console.log("The server is all fired up"), console.log(process.env.DB_PORT);
});
=======
console.log(process.env.DB_PORT)

app.listen(process.env.DB_PORT, () => console.log("The server is all fired up"));
>>>>>>> main
