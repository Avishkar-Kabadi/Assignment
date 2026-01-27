const mongoose = require('mongoose');
require('dotenv').config();

dbUrl = process.env.MONGODB_URL;

mongoose.connect(`${dbUrl}/book_inventory`).then(() => {
    console.log("DB Connected");
}).catch((error) => {
    console.error(error);
});

module.exports = mongoose.connection;