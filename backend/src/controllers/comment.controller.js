import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import mongoose from "mongoose";

const getCommentsByPost = async (req, res) => {

  const { postId } = req.params;
  try {

  
    const postComments = await Comment.aggregate([
      {
        $match: { postId: new mongoose.Types.ObjectId(postId) }
      },
      {
        $lookup: {
          from:"users",
          localField:"commentedBy",
          foreignField:"_id",
          as:"userDetails"
        }
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$userDetails", 0] }
        }
      },
      {
        $project: {
          content: 1,
          createdAt:1,
          username:"$user.username"
        }
      }
    ])

    return res.status(200).json({
      success: true,
      message: "",
      data: postComments,
    });

    console.log("postComments->",postComments )

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: error.message,
    });
  }

};

const addComment = async (req, res) => {
  const { postId } = req.params;

  const { content } = req.body;
  const { _id } = req.admin;

  try {
    const existingPost = await Post.findOne({ _id: postId });

    if (!existingPost) {
      return res.status(404).json({
        status: false,
        message: "Post not found",
        data: "",
      });
    }

    const newComment = await Comment.create({
      content,
      postId,
      commentedBy: _id,
    });

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: error.message,
    });
  }
};


export { addComment, getCommentsByPost };
