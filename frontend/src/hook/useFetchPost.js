import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postDetails, selectPosts } from "../store/slice/postSlice.js";
import Cookies from "js-cookie";
import { BASE } from "../constant/index.js"


const useFetchPost = () => {
    
    const posts = useSelector(selectPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        const getPostData = async () => {
            const token = Cookies.get("accessToken");

            try {
                const res = await fetch(`${BASE}/post/allposts`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    credentials: "include",
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const data = await res.json();

                if (Array.isArray(data?.data)) {
                    dispatch(postDetails(data.data));
                } else {
                    console.error("Invalid response format:", data);
                }
            } catch (error) {
                console.error("Error fetching posts:", error.message);
            }
        };

        getPostData();
    }, [dispatch]);

    return posts;
};

export default useFetchPost;
