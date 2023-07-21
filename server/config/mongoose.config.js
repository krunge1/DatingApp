const mongoose = require('mongoose');


//ENTER THE NEW DATABASE NAME INTO THE ADDRESS
mongoose.connect('mongodb://127.0.0.1:27017/dating_app_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));