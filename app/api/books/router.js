const express = require('express');
const { auth } = require('../../middleware/auth');
const { getAllBook, createBook } = require('./controller');
const router = express.Router();
const upload = require("../../middleware/multer");

router.get('/books', auth, getAllBook);
// router.get('/categories/byid', auth, getCategories);
router.post('/books/create', auth, upload.single("image"), createBook);
// router.put('/categories/edit/:id', auth, updateCategories);
// router.put('/categories/edit', auth, updateCategoriesQuery);
// router.delete('/categories/delete', auth, deleteCategories);

module.exports = router;
