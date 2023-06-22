const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [Product],
    })

    res.json(categories);

  } catch (err) {
    console.log('There was an error retrieving the categories', err);
    res.status(500).json(err);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {

  } catch (err) {
    console.log('There was an error', err)
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {

  } catch (err) {
    console.log('There was an error', err)
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {

  } catch (err) {
    console.log('There was an error', err)
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {

  } catch (err) {
    console.log('There was an error', err)
    res.status(500).json(err);
  }
});

module.exports = router;
