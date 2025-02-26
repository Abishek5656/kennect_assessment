import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
    const { title, content } = req.body;

    try {
        const post = await Post.create({
            title,
            content,
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
    try {
        const posts = await Post.find();

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
    const { postId } = req.query;
    const { title, content } = req.body;

    try {
        const existingPost = await Post.find({ _id: postId });

        if (!existingPost) {
            return res.status(500).json({
                data: "",
                message: "Post details not found",
                success: false,
            });
        }

        const updatePostDetails = await Post.findByIdAndUpdate(
            postId,
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

    const { postId } = req.body;

    // const { } = req.

    try {

        const postDetails = await Post.findById(postId);

        // if(postDetails && postDetails.owner === userId) {

        // }

        if (!postDetails) {
            return res.status(500).json({
                data: "",
                message: "Post details not found",
                success: false,
            });
        }

        const deletePost = await Post.findByIdAndDelete(postId)

        return res.status(500).json({
            data: "",
            message: "Post Deleted Ssuccefully",
            success: false,
        });

    } catch (error) {
        return res.status(500).json({
            data: "",
            message: "Something went wrong",
            success: false,
        });
    }
}

export { createPost, getAllPost, deletePostDetails, updatePost };
