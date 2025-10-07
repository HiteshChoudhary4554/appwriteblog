import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import database from "../appwrite/Config";
import { PostForm } from "./index";

function Edit() {
  const {id} = useParams();
  
  const [post, setPost] = useState("");
  useEffect(() => {
    async function post(id) {
      const postc = await database.getPost(id);
      setPost(postc);
    }
    post(id);
  }, [id]);  
  return <PostForm post={post} />;
}

export default Edit;
