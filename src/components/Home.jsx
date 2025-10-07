import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import database from "../appwrite/Config";
import { PostCard } from "./index";
import { Link } from "react-router";

function Home() {
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPost = await database.displayPost();
        setPosts(allPost.documents);
      } catch (error) {
        console.log("Error fetching posts", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div>
        <p>Loading posts...</p>
      </div>
    );

  if (!authStatus) {
    return (
      <div>
        <h2>Login to read all posts..</h2>
      </div>
    );
  }

  if (posts.length == 0) {
    return (
      <div>
        <h2>Create your own post and then read..</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {posts.map((post) => (
        <Link key={post.$id} to={`/post/${post.$id}`}>
          <PostCard {...post} />
        </Link>
      ))}
    </div>
  );
}
export default Home;
