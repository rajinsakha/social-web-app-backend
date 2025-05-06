import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

const createPost = asyncHandler(async (req, res) => {
  const post = await Post.create({
    content: req.body.content,
    author: req.user.id,
  });

  res.status(201).json(post);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized to delete this post");
  }

  await post.remove();
  res.json({ message: "Post removed" });
});

const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user.id } },
    { new: true }
  );

  res.json(post);
});

const commentOnPost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        comments: {
          user: req.user.id,
          text: req.body.content,
        },
      },
    },
    { new: true }
  );

  res.status(201).json(post.comments);
});

export { createPost, deletePost, likePost, commentOnPost };
