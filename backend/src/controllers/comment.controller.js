import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";

const getCommentsByPost = async (req, res) => {

  const { postId } = req.params;
  try {

    console.log(postId)

    const postComments = await Comment.aggregate([
      {
        $match: {postId: ObjectId(postId)}
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
        $project: {
          content: 1,
          "userDetails.username":1
        }
      }
    ])


    console.log("postComments->",postComments )

  } catch (error) {
    return res.status(500).json({
      status: false,
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

    // Create a new comment
    const newComment = await Comment.create({
      content,
      postId,
      commentedBy: _id,
    });

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    return res.status(201).json({
      status: true,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      data: error.message,
    });
  }
};

const removeComment = async (req, res) => {
  const { _id } = req.admin;
  const { commentId } = req.params;

  console.log("commentId->", commentId);

  try {
    const existingComment = await Comment.findById(commentId);

    const postDetails = await Post.findById(existingComment?.postId);

    if (_id.toString() === postDetails.owner.toString()) {
      console.log("true");
    }

    if (postDetails?.owner.toString() !== _id.toString()) {
      return res.status(400).json({
        status: false,
        message: "You do not have permission to delete this comment",
        data: "",
      });
    }

    postDetails.comments = postDetails.comments.filter(
      (comment) => comment.toString() !== commentId.toString()
    );
    await postDetails.save();

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      status: true,
      message: "Comment removed successfully",
      data: "",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      data: error.message,
    });
  }
};

export { addComment, removeComment, getCommentsByPost };
