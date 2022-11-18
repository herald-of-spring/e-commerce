const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const resultData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(resultData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const resultData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!resultData) {
      res.status(404).json({ message: `No tag found with id ${req.params.id}.` });
      return;
    }
    res.status(200).json(resultData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  /* req.body should look like this...
    {
      tag_name: "new release"
    }
  */
  try {
    const resultData = await Tag.create(req.body);
    res.status(200).json(resultData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const resultData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!resultData) {
      res.status(404).json({ message: `No tag found with id ${req.params.id}.` });
      return;
    }
    res.status(200).json({message: `Modified to ${req.body.tag_name}`});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const resultData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!resultData) {
      res.status(404).json({ message: `No tag found with id ${req.params.id}.` });
      return;
    }
    res.status(200).json({ message: `Deletion successful.` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
