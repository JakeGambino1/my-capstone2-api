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

// PUT api/users/:id
// update user by id
router.put('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (req.body.firstName) user.firstName = req.body.firstName;
  if (req.body.lastName) user.lastName = req.body.firstName;
  if (req.body.isMentor !== undefined || req.body.isMentor !== null)
    user.isMentor = req.body.isMentor;
  if (
    req.body.requestToBeMentor !== undefined ||
    req.body.requestToBeMentor !== null
  )
    user.requestToBeMentor = req.body.requestToBeMentor;
  if (req.body.youtube) user.youtube = req.body.youtube;
  if (req.body.linkedin) user.linkedin = req.body.linkedin;
  if (req.body.intersts) user.interest = req.body.interests;
  if (req.body.bio) user.bio = req.body.bio;

  await user.save();
  res.json(user);
});

module.exports = router;
