import { useEffect } from "react";
import Header from "../components/Header.jsx";
import PostList from "../components/PostList.jsx";
import CreatePost from "../components/CreatePost.jsx"
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { postDetails, selectPosts } from "../store/slice/postSlice.js";
import useFetchPost from "../hook/useFetchPost.js"


const HomeLayout = () => {
    
    const fetchPost = useFetchPost()

    const dispatch = useDispatch();
    
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <Header />

            {/* Content Section */}
            <div className="max-w-3xl mx-auto mt-6 p-4">
                <CreatePost />
                <PostList posts={fetchPost || []} />
            </div>
        </div>
    );
};

export default HomeLayout;
