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
    linkedin
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
    linkedin
  });

  await user.save();
});

router.get('/', async (req, res) => {
  console.log(req.body);
});

module.exports = router;
