const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag, Product
        },
      ],
    });
    res.json(tags);
  } catch (err) {
    console.log('There was an error retrieving the products', err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try{
    const tag = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });
    res.json(tag);
  } catch (err) {
    console.log('There was an error retrieving the product', err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const tag = await Tag.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      backorder: req.body.backorder,
      category_id: req.body.category_id,
    });
    res.json(tag);
  } catch (err) {
    console.log('There was an error creating the product', err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.json(product);
  } catch (err) {
    console.log('There was an error updating the product', err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json(product);
  } catch (err) {
    console.log('There was an error deleting the product', err);
    res.status(500).json(err);
  }
});

module.exports = router;
