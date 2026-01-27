const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const db = require('./configs/db');
const bookRoutes = require('./routes/bookRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api', bookRoutes);

app.get("/", (req, res) => {
    res.send("Book Inventory API is running....");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});