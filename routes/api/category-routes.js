const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const resultData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(resultData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const resultData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!resultData) {
      res.status(404).json({ message: `No category found with id ${req.params.id}.` });
      return;
    }
    res.status(200).json(resultData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  /* req.body should look like this...
    {
      category_name: "Sports"
    }
  */
  try {
    const resultData = await Category.create(req.body);
    res.status(200).json(resultData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const resultData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!resultData) {
      res.status(404).json({ message: `No category found with id ${req.params.id}.` });
      return;
    }
    res.status(200).json({message: `Modified to ${req.body.category_name}`});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const resultData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!resultData) {
      res.status(404).json({ message: `No category found with id ${req.params.id}.` });
      return;
    }
    res.status(200).json({ message: `Deletion successful.` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
