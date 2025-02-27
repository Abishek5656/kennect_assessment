import { useState } from "react";

const CreatePost = ({ addNewPost }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content) return;

        // Creating a new post object
        const newPost = {
            id: Date.now(), // Unique ID
            title,
            content,
            owner: "You", // Example (Change based on authentication)
            time: "Just now",
            comments: [],
        };

        // Adding new post to state
        addNewPost(newPost);

        // Clearing input fields
        setTitle("");
        setContent("");
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Create a Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <textarea
                    placeholder="Enter post content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg h-28 resize-none"
                ></textarea>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
