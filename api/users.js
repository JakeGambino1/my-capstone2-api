const express = require('express');
const router = express.Router();
const User = require('../schema/User');
const gravatar = require('gravatar');

// Post api/users
// Register new user
// Public
router.post('/', async (req, res) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    email,
    password,
    interests,
    bio,
    youtube,
    linkedin,
    isAdmin
  } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    console.log('User exists');
  }

  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm'
  });

  user = new User({
    firstName,
    lastName,
    email,
    password,
    avatar: avatar,
    interests,
    bio,
    youtube,
    linkedin,
    isAdmin
  });

  await user.save();
  res.json(user);
});

// GET api/users
// get all users
router.get('/', async (req, res) => {
  const user = await User.find().sort({ date: -1 });
  res.json(user);
});

// GET api/users/:id
// get user by id
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

module.exports = router;
