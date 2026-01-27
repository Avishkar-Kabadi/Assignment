const express = require('express');

const router = express.Router();
const { getAllBooks, addBook, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const upload = require('../middleware/upload');

router.get('/books', getAllBooks);
router.post('/book', upload.single("image"), addBook);
router.get('/book/:id', getBookById);
router.put('/book/:id', upload.single("image"), updateBook);
router.delete('/book/:id', deleteBook);

module.exports = router; 