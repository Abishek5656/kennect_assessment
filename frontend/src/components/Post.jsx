import { useState } from "react";
import Comments from "./Comments";

const Post = ({ post }) => {
    const [showComments, setShowComments] = useState(false);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            {/* Post Title & Owner */}
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.owner} • {post.time}</p>

            {/* Post Content */}
            <p className="mt-2 text-gray-800">{post.content}</p>

            {/* Show Comments Button */}
            <button
                onClick={() => setShowComments(!showComments)}
                className="mt-4 text-blue-600 hover:underline"
            >
                {showComments ? "Hide Comments" : `View Comments (${post.comments.length})`}
            </button>

            {/* Comments Section */}
            {showComments && <Comments comments={post.comments} />}
        </div>
    );
};

export default Post;
