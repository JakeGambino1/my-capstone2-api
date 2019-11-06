const express = require('express');
const router = express.Router();

// GET api/users
// Put new user into DB
// Public
router.get('/', (req, res) => {
  res.send('user route');
});

module.exports = router;
