import React from "react";
import database from "../appwrite/Config";

function PostCard({ $id, featuredImage, title }) {
  
  return (
    <div
      id={$id}
      key={$id}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition duration-300 p3"
    >
      <div className="w-full h-48 overflow-hidden">
        <img
          src={database.getFileView(featuredImage)}
          alt="Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-100 text-center">
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default PostCard;
