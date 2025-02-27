import { useState } from "react";
import Header from "../components/Header.jsx";
import PostList from "../components/PostList.jsx";
import CreatePost from "../components/CreatePost.jsx";

const HomeLayout = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "First Post",
            content: "This is the content of the first post.",
            owner: "John Doe",
            time: "2 hours ago",
            comments: [
                { id: 1, text: "Nice post!", author: "Alice" },
                { id: 2, text: "Very informative.", author: "Bob" },
            ],
        },
        {
            id: 2,
            title: "Second Post",
            content: "This is another post with different content.",
            owner: "Jane Smith",
            time: "1 day ago",
            comments: [{ id: 1, text: "Interesting thoughts!", author: "Charlie" }],
        },
    ]);

    // Function to Add a New Post
    const addNewPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <Header />

            {/* Content Section */}
            <div className="max-w-3xl mx-auto mt-6 p-4">
                {/* Create Post Component */}
                <CreatePost addNewPost={addNewPost} />

                {/* Post List Section */}
                <PostList posts={posts} />
            </div>
        </div>
    );
};

export default HomeLayout;
