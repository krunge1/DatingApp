const mongoose = require("mongoose");
require("dotenv").config();

mongoose
    .connect(process.env.MongoDBURL, {
        useNewURLParser: true,
        useUnifiedTopology: true,
    })

    .then(() => console.log("Established a connection to the database"))
    .catch((err) =>
        console.log("Something went wrong when connecting to the database")
    );
