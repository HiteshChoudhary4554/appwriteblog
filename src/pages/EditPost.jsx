import React from "react";
import { PostForm } from "../Index";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditPost() {
  const { index } = useParams();
  const todos = useSelector((state) => state.todo.todos);
  const post = todos[index];

  return <PostForm post={post} />;
}

export default EditPost;
