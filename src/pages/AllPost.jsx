import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AllPost() {
  const navigate = useNavigate();
 const todos = useSelector((state) => state.todo.todos);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(todos);
  }, [todos]);

  if (posts && posts.length > 0) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-4">
        {posts.map((post,index) => (
          <PostCard
            onClick={() => navigate(`/post/${index}/${post.$id}`)}
            key={post.$id}
            post={post}
          />
        ))}
      </div>
    );
  } else {
    return <h3>please create post after that show post !!</h3>;
  }
}

export default AllPost;
