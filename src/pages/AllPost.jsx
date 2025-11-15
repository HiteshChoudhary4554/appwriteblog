import React, { useState, useEffect } from "react";
import  dataStore  from "../../appwrite/Config";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

function AllPost() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetch(){
      const posts = await dataStore.allDocument();
      setPosts(posts.documents);
    }
    fetch()
  }, [setPosts]);
  

  if (posts && posts.length > 0) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4">
        {posts.map((post) => (
          <PostCard
            onClick={() => navigate(`/post/${post.$id}`)}
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
