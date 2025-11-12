import React, { useEffect, useState } from "react";
import dataStore from "../../appwrite/Config";

function PostCard({ post, onClick }) {
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    async function fetch() {
      const url = await dataStore.imageView(post.imageid);
      setImageUrl(url.href || url);
    }
    fetch();
  }, [setImageUrl, post.imageid]);

  return (
    <div
      onClick={onClick}
      className=" bg-amber-50 shadow-2xl rounded hover:bg-gray-300 p-2 transition delay-150 duration-300 ease-in-out h-[340px]"
    >
      {post.imageid && (
        <div className="mb-2 rounded overflow-hidden h-[220px]">
          {imageUrl && (
            <img src={imageUrl} alt="Post Image" className="rounded" />
          )}
        </div>
      )}
      <div className="my-2 px-3 mb-2">
        <span className="font-semibold text-[20px]">{post.title}</span>
      </div>
    </div>
  );
}

export default PostCard;
