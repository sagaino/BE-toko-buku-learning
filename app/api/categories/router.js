const express = require('express');
const { getAllCategories, createCategories, updateCategories, deleteCategories, getCategories, updateCategoriesQuery } = require('./controller');
const { auth } = require('../../middleware/auth');
const router = express.Router();

router.get('/categories', auth, getAllCategories);
router.get('/categories/byid', auth, getCategories);
router.post('/categories/create', auth, createCategories);
router.put('/categories/edit/:id', auth, updateCategories);
router.put('/categories/edit', auth, updateCategoriesQuery);
router.delete('/categories/delete', auth, deleteCategories);

module.exports = router;
