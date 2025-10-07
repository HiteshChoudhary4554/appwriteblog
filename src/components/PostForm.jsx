import React, { useCallback, useEffect, useId} from "react";
import { Input, Select, Button, RTE, ErrorMessage } from "./index";
import { useForm } from "react-hook-form";
import database from "../appwrite/Config";
import { useRef } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AddPost({ post = {} }) {
  const userId = useSelector((state) => state.auth.userData.$id);
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      editor: "",
      visibleChoice: "active",
    },
  });

  useEffect(() => {
    if (post && Object.keys(post).length > 0) {
      reset({
        title: post.title || "",
        slug: post.slug || "",
        editor: post.content || "",
        visibleChoice: post.visibleChoice || "active",
      });
    }
  }, [post, reset]);  
  const tid = useId();
  const sid = useId();
  const iid = useId();
  const Sid = useId();

  const title = watch("title");
  const createSlug = useCallback((text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }, []);

  useEffect(() => {
    if (title) {
      setValue("slug", createSlug(title));
    } else {
      setValue("slug", "");
    }
  }, [title, createSlug, setValue]);

  const onSubmit = async (data) => {
    const content = editorRef.current.getContent();
      if (Object.keys(post).length > 0) {
    try {
      console.log("Old Image ID:", post.featuredImage);

      if (post.featuredImage) {
        try {
          await database.deleteFile(post.featuredImage);
          console.log("Old image deleted successfully");
        } catch (error) {
          if (error.message.includes("not be found")) {
            console.warn("Old image already deleted or missing, skipping delete...");
          } else {
            throw error;
          }
        }
      }

      var featuredImage = post.featuredImage;
        if (data.featuredImage[0]) {
          const updateImg = await database.uploadFile(data.featuredImage[0]);
          featuredImage = updateImg.$id
          console.log("1",featuredImage);
          
        }
        console.log("2",featuredImage);
        

      const updatedPost = await database.updatePost({
        slug: data.slug,
        title: data.title,
        content: content,
        featuredImage:featuredImage,
        status: data.visibleChoice,
      });

      console.log("Post updated successfully:", updatedPost);
      navigate(`/post/${updatedPost.$id}`);

    } catch (error) {
      console.error("Update failed:", error.message);
    }

  }  else {
      try {
        let featuredImage = undefined;
        if (data.featuredImage[0]) {
          featuredImage = await database.uploadFile(data.featuredImage[0]);
        }
        const post = await database.createPost({
          title: data.title,
          slug: data.slug,
          content: content,
          status: data.visibleChoice,
          featuredImage: featuredImage.$id || "",
          userid: userId,
        });
        navigate(`/post/${post.$id}`);
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-3/2 border-2">
          <Input
            label="Title"
            type="text"
            id={tid}
            placeholder="Enter a title.."
            {...register("title", {
              required: ErrorMessage.title.required,
              maxLength: {
                value: 50,
                message: ErrorMessage.title.maxLength,
              },
            })}
          />
          {errors.title && (
            <p className="text-red-600">{errors.title.message}</p>
          )}

          <Input
            label="Slug"
            type="text"
            readOnly
            id={sid}
            {...register("slug")}
          />

          <Controller
            name="editor"
            control={control}
            defaultValue={post?.content || ""} // optional
            render={({ field: { onChange, value } }) => (
              <RTE
                value={value}
                onChange={(content) => onChange(content)} // Controlled
                onInit={(editor) => (editorRef.current = editor)} // TinyMCE ref
              />
            )}
          />
        </div>
        <div className="w-1/2 border-2">
          <Input
            label="FeaturedImage"
            type="file"
            id={iid}
            accept="image/png, image/jpeg"
            {...register("featuredImage", {
              required: ErrorMessage.featuredImage.required,
            })}
          />
          {errors.featuredImage && (
            <p className="text-red-600">{errors.featuredImage.message}</p>
          )}

          <Select
            label="Select visibility"
            id={Sid}
            name="visibleChoice"
            options={["active", "disable"]}
            {...register("visibleChoice", {
              required: ErrorMessage.visibleChoice.required,
            })}
          />
          {errors.visibleChoice && (
            <p className="text-red-600">{errors.visibleChoice.message}</p>
          )}

          <Button type="submit">AddPost</Button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
