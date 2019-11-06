const express = require('express');
const router = express.Router();
const User = require('../schema/User');
const gravatar = require('gravatar');

// Post api/users
// Register new user
// Public
router.post('/', async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;
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
    avatar: avatar
  });

  await user.save();
});

module.exports = router;
