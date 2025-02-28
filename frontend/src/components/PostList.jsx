import React from "react";
import Post from "./Post";

const PostList = React.memo(({ posts }) => { 
    
    return (
        <div className="space-y-6">
            {posts.length === 0 ? (
                <p className="text-gray-500 text-center">No posts yet. Create one!</p>
            ) : (
                posts.map((post) => <Post key={post._id} post={post} />)
            )}
        </div>
    );
});

export default PostList;
