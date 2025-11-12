import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";
import { Input, errMsg, RTE, Select, Button } from "../Index/index";
import dataStore from "../../appwrite/Config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const titleId = useRef();
  const slugId = useRef();
  const imgId = useRef();
  const [loader, setLoader] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });
  const title = String(watch("title"));
  const slugify = (text) => {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 36); 
  };

  useEffect(() => {
    const generatedSlug = slugify(title);
    setValue("slug", generatedSlug);
  }, [title, setValue]);

  const onSubmit = async (data) => {
    setLoader(true)
    if (post) {
      let imageid = post.imageid ? post.imageid : undefined;
      if (data.file[0]) {
        if (post.imageid !== "") {
          await dataStore.deleteImage(post.imageid);
        }
        imageid = await dataStore.uploadImage(data.file[0]);
      }
      const document = await dataStore.updateDocument(
        {
          title: data.title,
          slug: data.slug,
          content: data.content,
          imageid: imageid ? imageid.$id : null,
          status: data.status,
          userid: post.userid,
        },
        post.$id
      );
      navigate(`/post/${document.$id}`);
    } else {
      let imageid = undefined;
      if (data.file[0]) {
        imageid = await dataStore.uploadImage(data.file[0]);
      }
      const document = await dataStore.createDocument({
        title: data.title,
        slug: data.slug,
        content: data.content,
        imageid: imageid ? imageid.$id : null,
        status: data.status,
        userid: userData.$id,
      });
      navigate(`/post/${document.$id}`);
    }
  };
  return (
    <div className="px-2 bg-gray-100 rounded shadow-2xl">
      <div className="font-semibold text-center py-2 text-[20px] uppercase">
        Add Post
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex containerForm">
          <div className=" div1 bg-amber-100 p-2 rounded m-2 w-3/5 ">
            <Input
              label="Title"
              type="text"
              id={titleId}
              placeholder="enter post title.."
              {...register("title", {
                required: errMsg.title,
              })}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}

            <Input
              label="Slug"
              type="text"
              value=""
              readOnly
              id={slugId}
              {...register("slug")}
            />

            <Controller
              control={control}
              required
              name="content"
              render={({ field }) => (
                <RTE value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
          <div className="div2 bg-amber-100 p-2 m-2 rounded grow-1">
            <Controller
              name="status"
              control={control}
              defaultValue="active"
              render={({ field }) => (
                <Select
                  label="Status"
                  options={["active", "inactive"]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Input label="Image" type="file" id={imgId} {...register("file")} />
            {errors.file && (
              <p className="text-red-500">{errors.file.message}</p>
            )}
            <div className="text-center">
              <Button label={loader?"adding post...":"Add Post"} type="submit" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
