const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  console.log(getPostsByTagName)
  next(); 
});

tagsRouter.get('/', async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags
  });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    const { tagName } = req.params
  try {
    const allPosts = await getPostsByTagName(tagName)
    
    
    const posts = allPosts.filter(post => {
      // if (post.active) {
      //   return true;
      // }
      
    return post.active || (req.user && post.author.id === req.user.id);
    });
    res.send({ posts });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;
  