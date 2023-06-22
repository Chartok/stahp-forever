const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const products = await Product.findAll({
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag
        },
      ],
    });
    res.json(products);
  } catch (err) {
    console.log('There was an error retrieving the products', err);
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  try{

    const product = await Product.findByPk({
      where: {
        id: req.params.id,
      },
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag
        },
      ],
    });


  } catch (err) {
    console.log('There was an error retrieving the product', err);
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
  const product = await Product.create(req.body);
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id
          };
        });
        const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
        return res.status(200).json(productTagIds);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    } catch (err) {
      console.log('There was an error creating the products', err);
      res.status(400).json(err);
    }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // update product data
    await Product.update(req.body, {
      where: {
        id: req.params.id
    },
  });
    
  const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
      // find all associated tags from ProductTag
  const productTagIds = productTags.map(({ tag_id }) => tag_id);

      // create filtered list of new tag_ids
  const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id
          };
        });

      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      const updatedProductTags = await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    
    res.json(updatedProductTags);

    } catch (err) {
      console.log('There was an error removing the product', err);
      res.status(400).json(err);
    };
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {

    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag
        }
      ]
    });
    res.json(product);
    console.log('Product deleted')

  } catch (err) {
    console.log('There was an error deleting the product', err);
    res.status(500).json(err);
  }
});

module.exports = router;
