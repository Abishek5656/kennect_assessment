import { FaTrash } from "react-icons/fa";
import { useState } from "react";

const CommentList = ({ comments, postOwner }) => {
    const [commentList, setCommentList] = useState(comments);

    // Function to delete a comment
    const handleDeleteComment = (commentId) => {
        setCommentList(commentList.filter((comment) => comment.id !== commentId));
    };

    return (
        <div className="mt-4">
            <h3 className="text-md font-semibold">Comments</h3>
            {commentList.length === 0 ? (
                <p className="text-gray-500 text-sm">No comments yet.</p>
            ) : (
                commentList.map((comment) => (
                    <div key={comment.id} className="flex items-center justify-between border-b py-2">
                        <div>
                            <p className="text-sm font-medium">{comment.author}</p>
                            <p className="text-gray-600 text-sm">{comment.text}</p>
                        </div>

                        {/* Show delete icon only if the post owner is the same as the logged-in user */}
                        {postOwner && (
                            <FaTrash
                                className="text-red-500 cursor-pointer hover:text-red-700"
                                onClick={() => handleDeleteComment(comment.id)}
                                size={16}
                            />
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default CommentList;
