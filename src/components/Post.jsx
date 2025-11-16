import React from "react";
import parse from "html-react-parser";
import dataStore from "../../appwrite/Config";
import { useParams } from "react-router-dom";
import { Button } from "../Index/index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTodo } from "../Store/todoSlice";

function Post() {
  const userData = useSelector((state) => state.auth.userData);
  const todos = useSelector((state) => state.todo.todos);
  const { index, id } = useParams();
  const post = todos[index];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-amber-100 p-10 shadow-2xl rounded-2xl">
      <div className="h-[300px] overflow-hidden rounded-xl">
        {post.imageUrl && (
          <img
            src={post.imageUrl || ""}
            alt="Post"
            width="800px"
            loading="lazy"
            decoding="async"
            style={{ maxWidth: "100%", borderRadius: "8px" }}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className=" contentPost my-10 text-2xl font-semibold capitalize text-gray-700 w-[700px] text-left">
        {post.title}
      </div>
      <div className=" contentPost w-[700px] text-left mb-4">
        {parse(post.content)}
      </div>
      {userData.$id === post.userid && (
        <div className="py-3">
          <Button
            onClick={() => {
              navigate(`/edit-post/${index}`);
            }}
            label="Edit"
          />
          <Button
            onClick={async () => {
              await dataStore.deleteDocument(id);
              dispatch(fetchTodo());
              navigate("/all-post");
            }}
            label="Delete"
            className="bg-red-500 py-1 px-2 rounded text-amber-50 hover:bg-red-700 active:bg-red-300"
          />
        </div>
      )}
    </div>
  );
}
export default Post;
