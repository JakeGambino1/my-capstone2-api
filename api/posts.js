const express = require('express');
const router = express.Router();
const User = require('../schema/User');
const Post = require('../schema/Post');

// POST api/written-content/
router.post('/', async (req, res) => {
  // const user = await User.findById(req.body.id).select('-password');
  const newPost = new Post({
    user: req.body.user,
    title: req.body.title,
    content: req.body.content
  });

  const post = await newPost.save();
  res.json(post);
});

// GET api/posts | get all posts
router.get('/', async (req, res) => {
  const post = await Post.find().sort({ date: -1 });
  res.json(post);
});

// GET api/posts/:id | get single post
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: 'Post not found' });
  }

  res.json(post);
});

// DEL api/post/:id |
router.delete('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: 'Post not found' });
  }
  // check if user wrote the piece of content
  if (postMessage.user.toString() !== req.user.id) {
    return res.status(401).json("You cannot delete other users' posts");
  }
  await post.remove();

  res.json({ msg: 'Post Deleted' });
});

// PUT api/posts/like/:id | like a post
router.put('/like/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);

  // if (
  //   post.likes.filter(like => like.user.toString() === req.body.id).length > 0
  // ) {
  //   return res.status(400).json({ msg: 'Post already liked' });
  // }
  post.likes.unshift({ user: req.body.id });
  await post.save();

  res.json(post.likes);
});

// PUT api/posts/unlike/:id | unlike a post
router.put('/unlike/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);

  // if (
  //   post.likes.filter(like => like.user.toString() === req.body.id).length === 0
  // ) {
  //   return res.status(400).json({ msg: 'Post has not yet been liked' });
  // }

  const removeIndex = post.likes
    .map(like => like.user.toString())
    .indexOf(req.body.id);

  post.likes.splice(removeIndex, 1);

  await post.save();

  res.json(post.likes);

  console.error(err.message);
  res.status(500).json('Server Error');
});

module.exports = router;
