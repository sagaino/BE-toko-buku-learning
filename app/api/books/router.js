const express = require('express');
const { auth } = require('../../middleware/auth');
const { getAllBook, createBook, updateBook, deleteBook } = require('./controller');
const router = express.Router();
const upload = require("../../middleware/multer");

router.get('/books', auth, getAllBook);
router.post('/books/create', auth, upload.single("image"), createBook);
router.put('/books/edit', auth, upload.single("image"), updateBook);
router.delete('/books/delete', auth, deleteBook);

module.exports = router;
