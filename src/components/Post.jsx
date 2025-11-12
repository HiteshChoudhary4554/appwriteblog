import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import dataStore from "../../appwrite/Config";
import { useParams } from "react-router-dom";
import {Button} from '../Index/index'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Post() {
  const userData = useSelector(state => state.userData)  
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const document = await dataStore.getDocument(id);
        setPost(document);
        setLoader(true);
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchDocument();
  }, [id, setPost]);

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (post.imageid) {
        try {
          const result = await dataStore.imageView(post.imageid);
          setImageUrl(result.href || result);
        } catch (error) {
          console.error("Image fetch error:", error);
        }
      }
    };

    fetchImage();
  }, [post.imageid]);

  return loader ? (
    <div className="flex flex-col items-center bg-amber-100 p-10 shadow-2xl rounded-2xl">
      <div className="h-[300px] overflow-hidden rounded-xl">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Post"
            width="800px"
            style={{ maxWidth: "100%", borderRadius: "8px" }}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className=" contentPost my-10 text-2xl font-semibold capitalize text-gray-700 w-[700px] text-left">{post.title}</div>
      <div className=" contentPost w-[700px] text-left mb-4">{parse(post.content)}</div>
      {userData.$id === post.userid && (<div className="py-3">
        <Button
          onClick={()=>{
            navigate(`/edit-post/${id}`);
          }}
         label="Edit"/>
        <Button
          onClick={async()=>{
            await dataStore.deleteDocument(id);
            navigate("/all-post");
          }}
         label="Delete" className="bg-red-500 py-1 px-2 rounded text-amber-50 hover:bg-red-700 active:bg-red-300"/>
      </div>)}
    </div>
  ) : (
    <h2>please wait loading....</h2>
  );
}
export default Post;
