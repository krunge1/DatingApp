require('dotenv').config();
const express = require("express");
const cors = require('cors')
const app = express();
app.use(cors());

require("./config/mongoose.config");

app.use(express.json(), express.urlencoded({extended: true}));
app.use(cors({origin: process.env.ORIGIN_PORT, credentials: true}));

require("./routes/User.routes")(app);

app.listen(process.env.DB_PORT, () => console.log("The server is all fired up"));
