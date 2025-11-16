import React from "react";

function PostCard({ post, onClick }) {
  return (
    <div
      onClick={onClick}
      className=" bg-amber-50 shadow-2xl rounded hover:bg-gray-300 p-2 transition delay-150 duration-300 ease-in-out h-[340px]"
    >
      {post.imageid && (
        <div className="mb-2 rounded overflow-hidden h-[220px]">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="preview"
              loading="lazy"
              decoding="async"
              className="rounded"
            />
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
