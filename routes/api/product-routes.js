const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const productData = await Product.findAll({
      include: [
        Category,
        {
          model: Product,
          through: Tag
        },
      ],

    });

    if(!productData) {
      res.status(404).json({ message: `No Products found ${productData}`});
      return;
    }

    res.json(productData);

  } catch (err) {
    console.log('There was an error retrieving the products', err);
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  try{

    const productData = await Product.findByPk(req.params.id, {
      include: 
      [
        {
          model: Category,
          through: Product,
          as: 'category_name'
        },
      ],
    });

    if(!productData) {
      res.status(404).json({ message: `No product by ${productData} found`});
      return;
    }

    res.status(200).json(productData);

  

  } catch (err) {
    console.log('There was an error with the request', err);
    res.json( 'There was an error with the request', err);
  }

});

// create new product
router.post('/', async (req, res) => {
  try {
      const productData = await Product.create(req.body);
      res.status(200).json(productData);
    } catch (err) {
      console.log('There was an error with the request', err);
      res.status(400).json(err);
    }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // update product data
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id
    },
  });
    
  // // find all associated tags from ProductTag
  //   const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
  //   const productTagIds = productTags.map(({ tag_id }) => tag_id);

  // // create filtered list of new tag_ids
  //   const newProductTags = req.body.tagIds
  //       .filter((tag_id) => !productTagIds.includes(tag_id))
  //       .map((tag_id) => {
  //         return {
  //           product_id: req.params.id,
  //           tag_id
  //         };
  //       });

  // // figure out which ones to remove
  //   const productTagsToRemove = productTags
  //       .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
  //       .map(({ id }) => id);

  // // run both actions
  //   const updatedProductTags = await Promise.all([
  //       ProductTag.destroy({ where: { id: productTagsToRemove } }),
  //       ProductTag.bulkCreate(newProductTags),
  //     ]);

      if(!productData) {
        res.status(404).json({ message: `${productData} could not be updated because it either doesn't exist, or there is something wrong with the request!` });
        return;
      }
  
      res.json(productData);

    } catch (err) {
      console.log('There was an error with the request', err);
      res.status(400).json(err);
    };
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {

    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if(!productData) {
      res.status(404).json ({ message: `No product by ${productData} found` });
      return;
    }

    res.json(productData);
    console.log('Product deleted successfuly')

  } catch (err) {
    console.log('There was an error with the request', err);
    res.status(500).json('There was an error with the request', err);
  }
});

module.exports = router;
