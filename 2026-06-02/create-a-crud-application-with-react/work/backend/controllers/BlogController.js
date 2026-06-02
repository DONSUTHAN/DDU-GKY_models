const Blog = require("../models/Blog");

const createpost = async (req, res) => {
  const { title, description, discription, author } = req.body;

  try {
    const newData = await Blog.create({
      title,
      description: description || discription,
      author,
    });

    res.status(201).json({ msg: "created successfully", data: newData });
  } catch (error) {
    res.status(500).json({ msg: "server error", error: error.message });
  }
};

const getposts = async (req, res) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ msg: "all posts", data: posts });
  } catch (error) {
    res.status(500).json({ msg: "server error", error: error.message });
  }
};

const updatepost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ msg: "post not found" });
    }

    res.status(200).json({ msg: "post updated", updatedata: updatedPost });
  } catch (error) {
    res.status(500).json({ msg: "server error", error: error.message });
  }
};

const deletepost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Blog.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ msg: "post not found" });
    }

    res.status(200).json({ msg: "delete successful" });
  } catch (error) {
    res.status(500).json({ msg: "server error", error: error.message });
  }
};

module.exports = { createpost, getposts, updatepost, deletepost };

