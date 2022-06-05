import React, { useState } from "react";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Avatar from "../avatar/Avatar";
import { useForm } from "react-hook-form";
import { GET_SUBREDDIT_BY_TOPIC, GET_ALL_POSTS } from "../../graphQl/querys";
import { ADD_POST, ADD_SUBREDDIT } from "../../graphQl/mutations";
import { useMutation } from "@apollo/client";
import client from "../../apollo-client";
import toast from "react-hot-toast";
import classes from "./SearchBox.module.css";

const SearchBox = ({ subreddit }) => {
  const { data: session } = useSession();

  const [imageBoxOpen, setImageBoxOpen] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, "getPostList "],
  });

  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const onSubmitHandler = handleSubmit(async (formData) => {
    const image = formData.postImage || "";

    const notifications = toast.loading("Creating new Post...");

    try {
      const {
        data: { getSubredditListByTopic: existingSubreddit },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit,
        },
      });

      const subredditExists = existingSubreddit.length > 0;

      if (!subredditExists) {
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });

        await addPost({
          variables: {
            title: formData.postTitle,
            body: formData.postBody,
            image: image,
            username: session?.user?.name,
            subreddit_id: newSubreddit.id,
          },
        });
      } else {
        await addPost({
          variables: {
            title: formData.postTitle,
            body: formData.postBody,
            image: image,
            username: session?.user?.name,
            subreddit_id: existingSubreddit[0].id,
          },
        });
      }

      setValue("postTitle", "");

      setValue("postBody", "");

      setValue("postImage", "");

      setValue("subreddit", "");

      toast.success("New Post created..", {
        id: notifications,
      });
    } catch (err) {
      console.log(err);

      toast.error("Something went wrong!", { id: notifications });
    }
  });

  return (
    <form onSubmit={onSubmitHandler} className={classes.form}>
      <div className={classes.container}>
        <Avatar />

        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          type="text"
          placeholder={
            session
              ? subreddit
                ? `Create a post in r/${subreddit}`
                : "Create a Post by entering a title!"
              : "Sign in to Post!"
          }
        />

        <PhotographIcon
          className={`${classes.icon} ${imageBoxOpen && classes.icon_selected}`}
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
        />

        <LinkIcon className={classes.icon} />
      </div>

      {!!watch("postTitle") && (
        <div className={classes.others}>
          <div className={classes.body}>
            <p>Body</p>

            <input
              {...register("postBody")}
              type="text"
              placeholder="Text (Optional) "
            />
          </div>

          {!subreddit && (
            <div className={classes.body}>
              <p>Subreddit</p>

              <input
                {...register("subreddit", { required: true })}
                type="text"
                placeholder="i.e reactjs"
              />
            </div>
          )}

          {imageBoxOpen && (
            <div className={classes.body}>
              <p>Image Url</p>

              <input
                {...register("postImage")}
                type="text"
                placeholder="Optional..."
              />
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className={classes.errors}>
              {errors.postTitle?.type === "required" && (
                <p>A post title is required</p>
              )}

              {errors.subreddit?.type === "required" && (
                <p>A subreddit is required</p>
              )}
            </div>
          )}

          <button className={classes.btn} type="submit">
            Create Post
          </button>
        </div>
      )}
    </form>
  );
};

export default SearchBox;
