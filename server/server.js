const express = require("express");
const cors = require("cors");
const path = require('path')

const app = express();

const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./config/mongoose.config");

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // <-- used to handle uploaded photos
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.ORIGIN_PORT, credentials: true }));
app.use(cookieParser());

require("./routes/User.routes")(app);
require("./routes/Profile.routes")(app);

app.listen(process.env.DB_PORT, () =>
    console.log("The server is all fired up")
);
