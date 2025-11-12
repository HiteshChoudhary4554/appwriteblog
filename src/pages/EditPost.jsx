import React,{useState, useEffect} from "react";
import { PostForm } from "../Index";
import { useParams } from "react-router-dom";
import dataStore from "../../appwrite/Config";

function EditPost() {
  const { id } = useParams();
  const [loader, setLoader] = useState(false)
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

  return loader?<PostForm post={post} />:<h2>Loading please wait...</h2>;
}

export default EditPost;
