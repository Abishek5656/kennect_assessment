import React, { useState } from "react";
import Comments from "./Comments";
import { formatDistanceToNow, parseISO } from "date-fns";

const Post = ({ post }) => {

    const [showComments, setShowComments] = useState(false);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">

            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600">
                {post.username} • {formatDistanceToNow(parseISO(post.createdAt), { addSuffix: true })}
            </p>


            <p className="mt-2 text-gray-800">{post.content}</p>


            <button
                onClick={() => setShowComments(!showComments)}
                className="mt-4 text-blue-600 hover:underline"
            >
                {showComments ? "Hide Comments" : `View Comments (${post.comments?.length || 0})`}
            </button>


            {showComments && <Comments post={post._id} />}
        </div>
    );
};

export default React.memo(Post);
