import asyncHandler from "express-async-handler";
import Group from "../models/Group.js";
import Post from "../models/Post.js";

// @desc    Create new group
// @route   POST /api/groups
// @access  Private
const createGroup = asyncHandler(async (req, res) => {
  const { name, description, type } = req.body;

  const group = await Group.create({
    name,
    description,
    type,
    createdBy: req.user.id,
    members: [req.user.id],
  });

  res.status(201).json(group);
});

// @desc    Get groups by type
// @route   GET /api/groups
// @access  Public
const getGroups = asyncHandler(async (req, res) => {
  const { type } = req.query;
  const filter = type ? { type } : {};

  const groups = await Group.find(filter)
    .populate("createdBy", "name avatar")
    .populate("members", "name avatar");

  res.json(groups);
});

// @desc    Join group
// @route   PUT /api/groups/:id/join
// @access  Private
const joinGroup = asyncHandler(async (req, res) => {
  const group = await Group.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { members: req.user.id } },
    { new: true }
  );

  res.json(group);
});

// @desc    Create group post
// @route   POST /api/groups/:id/posts
// @access  Private
const createGroupPost = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) {
    res.status(404);
    throw new Error("Group not found");
  }

  const post = await Post.create({
    content: req.body.content,
    author: req.user.id,
    group: group._id,
  });

  group.posts.push(post._id);
  await group.save();

  res.status(201).json(post);
});

export { createGroup, getGroups, joinGroup, createGroupPost };
