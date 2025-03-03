import React, { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allPostsDetails, fetchPost } from "../store/slice/postSlice.js";


const Header = React.lazy(() => import("../components/Header.jsx"));
const CreatePost = React.lazy(() => import("../components/CreatePost.jsx"));
const PostList = React.lazy(() => import("../components/PostList.jsx"));

const HomeLayout = () => {
    const dispatch = useDispatch();
    const posts = useSelector(allPostsDetails);

    useEffect(() => {
        dispatch(fetchPost());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Suspense fallback={<div>Loading Header...</div>}>
                <Header />
                <div className="max-w-3xl mx-auto mt-6 p-4">
                    <CreatePost />
                    <PostList posts={posts || []} />
                </div>
            </Suspense>
        </div>
    );
};

export default HomeLayout;
