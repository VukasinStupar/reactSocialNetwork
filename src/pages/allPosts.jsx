import React, { useEffect, useState } from "react";
import axios from "axios";

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const size = 10;

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const fetchPosts = async () => {
        try {
            const response = await axios.post(
                `/displayAllPost?page=${page}&size=${size}`
            );
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts", error);
        }
    };

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
                    <img
                        src={post.bunnyImage}
                        alt="Bunny"
                        style={{ width: "100%", height: "150px", objectFit: "cover" }}
                    />
                    <h2>{post.user.name}</h2>
                    <p>{post.description}</p>
                    <p>{new Date(post.createdAt).toLocaleString()}</p>
                    <p>❤️ {post.likes} Likes</p>
                </div>
            ))}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
                    Previous
                </button>
                <button onClick={() => setPage((prev) => prev + 1)} style={{ marginLeft: "10px" }}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllPosts;
