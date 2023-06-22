const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [Product],
    })

    res.json(categories);

    console.log('Here are all of the categories')
  } catch (err) {
    console.log('There was an error retrieving the categories', err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {

    const category = await Category.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
      include: [Product]
    })
    res.json(category);

    console.log('Category retrieved')
  } catch (err) {
    console.log('There was an error retrieving the category', err)
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {

    const category = await Category.create({
      category_name: req.body.category_name,
    })
    res.json(category);

    console.log('Category created')
  } catch (err) {
    console.log('There was an error there was an error creating the category', err)
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {

    const category = await Category.update({
      where: {
        id: req.params.id,
      },
    })
    res.json(category);

    console.log('Category updated')
  } catch (err) {
    console.log('There was an error there was an error updating the category', err)
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {

    const category = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.json(category)

    
    console.log('Category deleted')
  } catch (err) {
    console.log('There was an error deleting the category', err)
    res.status(500).json(err);
  }
});

module.exports = router;
