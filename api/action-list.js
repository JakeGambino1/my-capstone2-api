const express = require('express');
const router = express.Router();
const User = require('../schema/User');
const ActionList = require('../schema/ActionList');

// POST api/action-list/
router.post('/', async (req, res) => {
  const newActionItem = new ActionList({
    title: req.body.title,
    isComplete: false
  });

  const actionItem = await newActionItem.save();
  res.json(actionItem);
});

// GET api/action-list | get all action list items
router.get('/', async (req, res) => {
  const actionList = await ActionList.find().sort({ date: -1 });
  res.json(actionList);
});

// DEL api/action-list/:id |
router.delete('/:id', async (req, res) => {
  const actionList = await ActionList.findById(req.params.id);

  if (!actionList) {
    return res.status(404).json({ msg: 'Action item not found' });
  }
  await actionList.remove();

  res.json({ msg: 'Action item Deleted' });
});

module.exports = router;
