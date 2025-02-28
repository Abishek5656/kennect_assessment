import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

const createPost = async (req, res) => {
  const { title, content } = req.body;

  const { _id } = req.admin;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({
        data: "",
        message: "User not found",
        success: false,
      });
    }

    const post = await Post.create({
      title,
      content,
      owner: user._id,
    });

    return res.status(200).json({
      data: post,
      message: "Post Created Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      data: "",
      message: "Something went wrong",
      success: false,
    });
  }
};

const getAllPost = async (req, res) => {
  const { _id } = req.admin;

  try {
    const user = await User.findById(_id);

    console.log(user)

    if (!user) {
      return res.status(404).json({
        data: "",
        message: "User not found",
        success: false,
      });
    }

    const posts = await Post.aggregate([
      { $match: {} },
      { $lookup: {
        from:"users",
        localField:"owner",
        foreignField:"_id",
        as:"userDetails"
      }},
      {
        $addFields: {
          user: { $arrayElemAt: ["$userDetails", 0] }
        }
      },
      {$project: {title: 1, content:1, createdAt:1,owner:1, username:"$user.username", comments:1}},
      { $sort: { createdAt: -1 } } 
  ]);
  ;

    console.log(posts)

    return res.status(200).json({
      data: posts,
      message: "",
      success: true,
    });
  } catch (error) {
    return res.status(200).json({
      data: "",
      message: "Something went wrong",
      success: false,
    });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params

  const { title, content } = req.body;
  const { _id } = req.admin;

  try {
    const existingPost = await Post.findById(id);

    if (!existingPost) {
      return res.status(500).json({
        data: "",
        message: "Post details not found",
        success: false,
      });
    }

    const postOwner = await Post.findOne({ _id: id, owner: _id });

    if (!postOwner) {
      return res.status(403).json({
        data: "",
        message: "Only the owner can update the post",
        success: false,
      });
    }

    const updatePostDetails = await Post.findByIdAndUpdate(
      id,
      {
        $set: {
          title: title,
          content: content,
        },
      },
      { new: true }
    );

    return res.status(500).json({
      data: updatePostDetails,
      message: "Post details updated ",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      data: "",
      message: "Something went wrong",
      success: false,
    });
  }
};

const deletePostDetails = async (req, res) => {
  const { id } = req.params;

  const { _id } = req.admin;
  

  try {
    const postDetails = await Post.findById(postId);

    if (!postDetails) {
      return res.status(500).json({
        data: "",
        message: "Post details not found",
        success: false,
      });
    }

    const deletePost = await Post.findByIdAndDelete({
      _id: id,
      owner:_id
    });

    if(!deletePost) {
      return res.status(400).json({
        data: "",
        message: "Only Owner Can Deleted",
        success: false,
      });
    }

    return res.status(500).json({
      data: "",
      message: "Post Deleted Ssuccefully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      data: "",
      message: "Something went wrong",
      success: false,
    });
  }
};

export { createPost, getAllPost, deletePostDetails, updatePost };
