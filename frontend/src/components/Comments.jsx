import { FaTrash, FaPaperPlane } from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { formatDistanceToNow, parseISO } from "date-fns";
import { BASE } from "../constant/index.js"

const CommentList = ({ post }) => {
    const [commentList, setCommentList] = useState([]);
    const [content, setContent] = useState("");

    const getPostComments = async () => {
        if (!post) return;

        try {
            const token = Cookies.get("accessToken");
            const res = await fetch(`${BASE}/comment/commentpost/${post}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
            });

            const data = await res.json();
            if (data?.success) {
                setCommentList(data.data);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleAddComment = useCallback(async () => {
        if (!content.trim()) return;

        try {
            const token = Cookies.get("accessToken");
            const res = await fetch(`${BASE}/comment/createComment/${post}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ content }),
                credentials: "include",
            });

            if (!res.ok) throw new Error("Failed to add comment");

            const data = await res.json();
            setContent(""); 
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    }, [content, post]);

    useEffect(() => {
        getPostComments();
    }, [post, handleAddComment]); 

    return (
        <div className="mt-4">
            <h3 className="text-md font-semibold">Comments</h3>
            <div className="flex items-center border p-2 rounded-md">
                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 p-2 outline-none"
                />
                <FaPaperPlane
                    className="text-blue-500 cursor-pointer hover:text-blue-700 ml-2"
                    onClick={handleAddComment}
                    size={18}
                />
            </div>
            {commentList.length === 0 ? (
                <p className="text-gray-500 text-sm mt-2">No comments yet.</p>
            ) : (
                commentList.map((comment) => (
                    <div key={comment._id} className="flex items-center justify-between border-b py-2">
                        <div>
                            <p className="text-sm font-medium">{comment.username} . {formatDistanceToNow(parseISO(comment.createdAt), { addSuffix: true })}</p>
                            <p className="text-gray-600 text-sm">{comment.content}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CommentList;
