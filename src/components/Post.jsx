import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import database from "../appwrite/Config";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const userId = useSelector((state) => state.auth.userData.$id);

  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const { id } = useParams();
  useEffect(() => {
    async function fetchPost() {
      const postData = await database.getPost(id);
      if (postData) {
        setPost(postData);
      }
    }
    fetchPost();
  }, [id]);

  const deletePost = () => {
    database.deletePost(id);
    navigate("/");
  };

  return (
    <div>
      {userId === post.userid && (
        <div>
          <span>
            <Link
              to={`/post/edit/${post.$id}`}
              className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </Link>
          </span>
          <span>
            <Link
              onClick={deletePost}
              className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </Link>
          </span>
        </div>
      )}
      <div>
        {post.featuredImage && (
          <img
            width="400px"
            src={database.getFileView(post.featuredImage)}
            alt="Image"
          />
        )}
      </div>
      <div>
        <h2>{post.title}</h2>
      </div>
      <div className="prose"> {parse(post.content || "")}</div>
    </div>
  );
}

export default Post;
